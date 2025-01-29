import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { SearchDto } from "src/common/dto/search.dto";
import { User } from "src/auth/decorators/user.decorator";
import { User as UserEntity } from "src/users/entities/user.entity";

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @User() user: UserEntity,
  ) {
    return this.workspaceService.create({
      ...createWorkspaceDto,
      user,
    });
  }

  @Get()
  findAll(@Query() searchDto: SearchDto, @User() user: UserEntity) {
    return this.workspaceService.findAll(
      searchDto,
      {
        user: {
          id: user.id,
        },
      },
      {
        collection: {
          children: true,
        },
      },
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workspaceService.findOne(id, {
      collection: { children: true },
    });
  }

  @Get("collection/:id")
  findOneByCollection(@Param("id") collectionId: string) {
    return this.workspaceService.findOneByRootCollectionId(collectionId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }
}
