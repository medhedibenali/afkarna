import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  user: User;
}
