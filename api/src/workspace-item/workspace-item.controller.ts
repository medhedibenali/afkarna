import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspaceItemService } from './workspace-item.service';
import { CreateWorkspaceItemDto } from './dto/create-workspace-item.dto';
import { UpdateWorkspaceItemDto } from './dto/update-workspace-item.dto';

@Controller('workspace-item')
export class WorkspaceItemController {
  constructor(private readonly workspaceItemService: WorkspaceItemService) {}

  @Post()
  create(@Body() createWorkspaceItemDto: CreateWorkspaceItemDto) {
    return this.workspaceItemService.create(createWorkspaceItemDto);
  }

  @Get()
  findAll() {
    return this.workspaceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceItemDto: UpdateWorkspaceItemDto) {
    return this.workspaceItemService.update(+id, updateWorkspaceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceItemService.remove(+id);
  }
}
