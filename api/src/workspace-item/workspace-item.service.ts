import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateWorkspaceItemDto } from "./dto/create-workspace-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkspaceItem } from "./entities/workspace-item.entity";
import { CrudService } from "src/common/crud/crud.service";
import { UpdateWorkspaceItemDto } from "./dto/update-workspace-item.dto";

@Injectable()
export class WorkspaceItemService extends CrudService<WorkspaceItem> {
  constructor(
    @InjectRepository(WorkspaceItem)
    private workspaceItemRepository: Repository<WorkspaceItem>,
  ) {
    super(workspaceItemRepository);
  }

  async create(createWorkspaceItemDto: CreateWorkspaceItemDto) {
    if (createWorkspaceItemDto.parentId) {
      const parent = await super.findOne(createWorkspaceItemDto.parentId);
      if (!parent) {
        throw new NotFoundException("Parent not found");
      }
      return super.create({ ...createWorkspaceItemDto, parent });
    }

    return super.create(createWorkspaceItemDto);
  }

  async update(
    id: string,
    updateWorkspaceItemDto: UpdateWorkspaceItemDto,
  ): Promise<WorkspaceItem> {
    if (updateWorkspaceItemDto.parentId) {
      const parent = await super.findOne(updateWorkspaceItemDto.parentId);
      if (!parent) {
        throw new NotFoundException("Parent not found");
      }
      return super.update(id, { ...updateWorkspaceItemDto, parent });
    }
    return super.update(id, updateWorkspaceItemDto);
  }

  async findAllByParentId(parentId: string) {
    return await this.workspaceItemRepository.find({
      where: { parent: { id: parentId } },
    });
  }

  async remove(id: string) {
    const workspaceItem = await super.findOne(id);
    if (workspaceItem.type == "note") {
      return super.remove(id);
    } else {
      const children = await this.findAllByParentId(id);
      for (const child of children) {
        await this.remove(child.id);
      }
      return super.remove(id);
    }
  }
}
