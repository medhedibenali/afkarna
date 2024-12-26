import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { SearchDto } from 'src/common/dto/search.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto);
  }

  @Get()
  findAll(@Body() searchDto: SearchDto) {
    return this.workspaceService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(id, { collection: true });
  }

  @Get('collection/:id')
  findOneByCollection(@Param('id') collectionId: string) {
    return this.workspaceService.findOneByRootCollectionId(collectionId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(id);
  }
}
