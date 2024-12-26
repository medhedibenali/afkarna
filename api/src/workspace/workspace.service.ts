import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceItemService } from 'src/workspace-item/workspace-item.service';
import { Workspace } from './entities/workspace.entity';
import { CrudService } from 'src/common/crud/crud.service';

@Injectable()
export class WorkspaceService extends CrudService<Workspace> {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    private workspaceItemService: WorkspaceItemService,
  ) {
    super(workspaceRepository);
  }
  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    const rootCollection = await this.workspaceItemService.create({
      name: createWorkspaceDto.name,
      type: 'collection',
    });
    return await super.create({
      name: createWorkspaceDto.name,
      collection: rootCollection,
    });
  }

  async findOneByRootCollectionId(collectionId: string) {
    return await this.workspaceRepository.findOne({
      where: { collection: { id: collectionId } },
    });
  }
  async remove(id: string): Promise<DeleteResult> {
    const workspace = await this.findOne(id);
    const rootCollectionHasChildren =
      await this.workspaceItemService.findAllByParentId(
        workspace.collection.id,
      );
    if (rootCollectionHasChildren.length == 0) {
      super.remove(id);
      return await this.workspaceItemService.remove(workspace.collection.id);
    } else {
      throw new Error(
        'Cannot delete workspace because the root collection has children.',
      );
    }
  }
}
