import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { WorkspaceItemService } from "./workspace-item.service";
import { CreateWorkspaceItemDto } from "./dto/create-workspace-item.dto";
import { UpdateWorkspaceItemDto } from "./dto/update-workspace-item.dto";
import { SearchDto } from "src/common/dto/search.dto";

@Controller("workspace-item")
export class WorkspaceItemController {
  constructor(private readonly workspaceItemService: WorkspaceItemService) {}

  @Post()
  create(@Body() createWorkspaceItemDto: CreateWorkspaceItemDto) {
    return this.workspaceItemService.create(createWorkspaceItemDto);
  }

  @Get()
  findAll(@Body() searchDto: SearchDto) {
    return this.workspaceItemService.findAll(searchDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workspaceItemService.findOne(id, { children: true });
  }

  @Get("parent/:id")
  findAllByParentId(@Param("id") id: string) {
    return this.workspaceItemService.findAllByParentId(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkspaceItemDto: UpdateWorkspaceItemDto,
  ) {
    return this.workspaceItemService.update(id, updateWorkspaceItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workspaceItemService.remove(id);
  }
}
