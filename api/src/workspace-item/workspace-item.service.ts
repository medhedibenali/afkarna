import { Injectable } from '@nestjs/common';
import { CreateWorkspaceItemDto } from './dto/create-workspace-item.dto';
import { UpdateWorkspaceItemDto } from './dto/update-workspace-item.dto';

@Injectable()
export class WorkspaceItemService {
  create(createWorkspaceItemDto: CreateWorkspaceItemDto) {
    return 'This action adds a new workspaceItem';
  }

  findAll() {
    return `This action returns all workspaceItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workspaceItem`;
  }

  update(id: number, updateWorkspaceItemDto: UpdateWorkspaceItemDto) {
    return `This action updates a #${id} workspaceItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspaceItem`;
  }
}
