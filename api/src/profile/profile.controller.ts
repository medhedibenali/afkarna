import { Body, Controller, Delete, Get, Patch } from "@nestjs/common";
import { User } from "src/auth/decorators/user.decorator";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User as UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(@User() user: UserEntity) {
    return user;
  }

  @Patch()
  update(@User() { id }: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  remove(@User() { id }: UserEntity) {
    return this.usersService.remove(id);
  }
}
