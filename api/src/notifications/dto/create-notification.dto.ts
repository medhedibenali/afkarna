import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @IsString()
  @IsNotEmpty()
  invitedUserId: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
