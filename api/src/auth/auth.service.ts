import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { User } from "../users/entities/user.entity";
import { hash, verify } from "argon2";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CrudService } from "../common/crud/crud.service";
import { TokenType } from "./enum/token-type.enum";
import { RefreshDto } from "./dto/refresh.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { Auth } from "./entities/auth.entity";
import { UsersService } from "src/users/users.service";
import { NonceDto } from "./dto/nonce.dto";

@Injectable()
export class AuthService extends CrudService<Auth> {
  constructor(
    @InjectRepository(Auth) authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super(authRepository);
  }

  async register(registerUserDto: RegisterUserDto): Promise<AuthDto> {
    const { password } = registerUserDto;
    registerUserDto.password = await hash(password);

    const user = await this.usersService.create(registerUserDto);

    const tokens = this.generateTokens(user);

    await super.create({
      user,
      token: tokens.refreshToken,
      type: TokenType.Refresh,
    });

    return tokens;
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthDto> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await verify(user.password, password))) {
      throw new UnauthorizedException();
    }

    const tokens = this.generateTokens(user);

    await super.create({
      user,
      token: tokens.refreshToken,
      type: TokenType.Refresh,
    });

    return tokens;
  }

  async logout({ refreshToken }: RefreshDto) {
    await this.repository.delete({
      token: refreshToken,
      type: TokenType.Refresh,
    });
  }

  async disconnect({ id }: User) {
    await this.repository.delete({
      user: {
        id,
      },
    });
  }

  async updateLogin(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<AuthDto> {
    const { password } = changePasswordDto;
    changePasswordDto.password = await hash(password);

    const user = await this.usersService.update(id, changePasswordDto);

    await this.disconnect(user);

    return this.generateTokens(user);
  }

  async refresh({ refreshToken }: RefreshDto): Promise<AuthDto> {
    try {
      const auth = await this.repository.findOneBy({
        token: refreshToken,
        type: TokenType.Refresh,
      });

      if (!auth) {
        throw new BadRequestException();
      }

      let payload: Omit<JwtPayload, "type">;

      try {
        const { type: _type, ...payload_ }: JwtPayload = this.jwtService.verify(
          refreshToken,
          {
            ignoreExpiration: false,
          },
        );

        payload = payload_;
      } catch {
        await super.remove(auth.id);
        throw new BadRequestException();
      }

      const tokens = this.generateTokens(payload);

      auth.token = tokens.refreshToken;

      await this.repository.save(auth);

      return tokens;
    } catch {
      throw new BadRequestException();
    }
  }

  async nonce(user: User): Promise<NonceDto> {
    const nonce = this.generateNonce(user);

    await super.create({
      user,
      token: nonce,
      type: TokenType.Nonce,
    });

    return { nonce };
  }

  async verifyNonce(nonce: string | undefined): Promise<User | null> {
    if (!nonce) {
      return null;
    }

    try {
      this.jwtService.verify(nonce, {
        ignoreExpiration: false,
      });
    } catch (_error) {
      await this.repository.delete({ token: nonce, type: TokenType.Nonce });
      return null;
    }

    const auth = await this.repository.findOne({
      where: { token: nonce, type: TokenType.Nonce },
      relations: { user: true },
    });

    if (!auth) {
      return null;
    }

    const user = auth.user;

    await this.repository.remove(auth);

    return user;
  }

  private generateTokens({ id, username, email }: DeepPartial<User>): AuthDto {
    const payload: Omit<JwtPayload, "type"> = {
      sub: id,
      username,
      email,
    };

    return {
      refreshToken: this.jwtService.sign(
        {
          ...payload,
          type: TokenType.Refresh,
        },
        {
          expiresIn: "60d",
        },
      ),
      accessToken: this.jwtService.sign(
        {
          ...payload,
          type: TokenType.Access,
        },
        {
          expiresIn: "1h",
        },
      ),
    };
  }

  private generateNonce({ id, username, email }: DeepPartial<User>): string {
    const payload: JwtPayload = {
      sub: id,
      username,
      email,
      type: TokenType.Nonce,
    };

    return this.jwtService.sign(payload, {
      expiresIn: "5m",
    });
  }
}
