import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  commentId: string;
}
