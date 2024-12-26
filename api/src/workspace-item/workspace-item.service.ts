import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateWorkspaceItemDto } from './dto/create-workspace-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceItem } from './entities/workspace-item.entity';
import { CrudService } from 'src/common/crud/crud.service';

@Injectable()
export class WorkspaceItemService extends CrudService<WorkspaceItem> {
  constructor(
    @InjectRepository(WorkspaceItem)
    private workspaceItemRepository: Repository<WorkspaceItem>,
  ) {
    super(workspaceItemRepository);
  }
  create(createWorkspaceItemDto: CreateWorkspaceItemDto) {
    const workspace_item = this.workspaceItemRepository.create({
      name: createWorkspaceItemDto.name,
      type: createWorkspaceItemDto.type,
    });
    return this.workspaceItemRepository.save(workspace_item);
  }

  async findAllByParentId(parentId: string) {
    return await this.workspaceItemRepository.find({
      where: { parent: { id: parentId } },
    });
  }
}