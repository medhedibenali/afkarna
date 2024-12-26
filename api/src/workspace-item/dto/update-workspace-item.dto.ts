import { IsOptional, IsEnum } from 'class-validator';

export class UpdateWorkspaceItemDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  parentId?: number;

  @IsOptional()
  workspaceId?: number;
}