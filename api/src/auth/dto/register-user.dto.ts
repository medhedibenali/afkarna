import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  profilePicture?: string;
}
