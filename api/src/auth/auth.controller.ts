import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Public } from "./decorators/public.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { User } from "./decorators/user.decorator";
import { User as UserEntity } from "../users/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { NonceDto } from "./dto/nonce.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Public()
  register(@Body() registerUserDto: RegisterUserDto): Promise<AuthDto> {
    return this.authService.register(registerUserDto);
  }

  @Post("login")
  @Public()
  login(@Body() loginUserDto: LoginUserDto): Promise<AuthDto> {
    return this.authService.login(loginUserDto);
  }

  @Post("logout")
  logout(@Body() refreshDto: RefreshDto): Promise<void> {
    return this.authService.logout(refreshDto);
  }

  @Post("disconnect")
  disconnect(@User() user: UserEntity): Promise<void> {
    return this.authService.disconnect(user);
  }

  @Post("refresh")
  @Public()
  refresh(@Body() refreshDto: RefreshDto): Promise<AuthDto> {
    return this.authService.refresh(refreshDto);
  }

  @Post("nonce")
  nonce(@User() user: UserEntity): Promise<NonceDto> {
    return this.authService.nonce(user);
  }

  @Post("change-password")
  updateLogin(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() { id }: UserEntity,
  ): Promise<AuthDto> {
    return this.authService.updateLogin(id, changePasswordDto);
  }

  @Get("email-exists")
  @Public()
  emailExists(@Query("email") email: string): Promise<boolean> {
    return this.authService.emailExists(email);
  }

  @Get("username-exists")
  @Public()
  usernameExists(@Query("username") username: string): Promise<boolean> {
    return this.authService.usernameExists(username);
  }
}
