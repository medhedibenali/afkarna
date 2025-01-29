import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  workspace: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  invitedUser: string;
}
