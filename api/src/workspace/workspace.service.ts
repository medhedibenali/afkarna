import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkspaceItemService } from "src/workspace-item/workspace-item.service";
import { Workspace } from "./entities/workspace.entity";
import { CrudService } from "src/common/crud/crud.service";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";

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
      type: "collection",
    });

    return super.create({
      ...createWorkspaceDto,
      collection: rootCollection,
    });
  }

  async findOneByRootCollectionId(collectionId: string) {
    return await this.workspaceRepository.findOne({
      where: { collection: { id: collectionId } },
    });
  }

  async updateWorkspace(
    workspaceId: string,
    workspaceItemId: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    await this.workspaceItemService.update(workspaceItemId, {
      name: updateWorkspaceDto.name,
    });
    return await super.update(workspaceId, updateWorkspaceDto);
  }
}
