import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkspaceItemService } from "src/workspace-item/workspace-item.service";
import { Workspace } from "./entities/workspace.entity";
import { CrudService } from "src/common/crud/crud.service";

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
}
