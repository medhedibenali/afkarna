import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkspaceItemDto } from './dto/create-workspace-item.dto';
import { UpdateWorkspaceItemDto } from './dto/update-workspace-item.dto';
import { WorkspaceItem } from './entities/workspace-item.entity';

@Injectable()
export class WorkspaceItemService {
  constructor(
    @InjectRepository(WorkspaceItem)
    private readonly workspaceItemRepository: Repository<WorkspaceItem>,
  ) {}

  async create(createWorkspaceItemDto: CreateWorkspaceItemDto): Promise<WorkspaceItem> {
    const workspaceItem = this.workspaceItemRepository.create(createWorkspaceItemDto);
    return this.workspaceItemRepository.save(workspaceItem);
  }

  async findAll(): Promise<WorkspaceItem[]> {
    return this.workspaceItemRepository.find();
  }

  async findOne(id: string): Promise<WorkspaceItem> {
    const workspaceItem = await this.workspaceItemRepository.findOneById(id);
    if (!workspaceItem) {
      throw new NotFoundException(`WorkspaceItem with ID ${id} not found`);
    }
    return workspaceItem;
  }

  async update(id: string, updateWorkspaceItemDto: UpdateWorkspaceItemDto): Promise<WorkspaceItem> {
    await this.workspaceItemRepository.update(id, updateWorkspaceItemDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.workspaceItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WorkspaceItem with ID ${id} not found`);
    }
  }
}