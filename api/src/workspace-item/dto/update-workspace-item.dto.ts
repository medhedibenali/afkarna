import { IsOptional, IsEnum } from "class-validator";

export class UpdateWorkspaceItemDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  workspaceId?: string;
}
