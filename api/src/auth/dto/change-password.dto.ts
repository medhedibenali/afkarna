import { PickType } from "@nestjs/mapped-types";
import { RegisterUserDto } from "./register-user.dto";

export class ChangePasswordDto extends PickType(RegisterUserDto, [
  "password",
] as const) {}
