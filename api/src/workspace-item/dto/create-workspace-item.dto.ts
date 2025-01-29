import { IsNotEmpty, IsOptional, IsEnum } from "class-validator";

export class CreateWorkspaceItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(["note", "collection"])
  type: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  workspaceId?: string;
}
