import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkspaceItemDto } from './create-workspace-item.dto';

export class UpdateWorkspaceItemDto extends PartialType(CreateWorkspaceItemDto) {}
