import { Module } from '@nestjs/common';
import { WorkspaceItemService } from './workspace-item.service';
import { WorkspaceItemController } from './workspace-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceItem } from './entities/workspace-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceItem])],
  controllers: [WorkspaceItemController],
  providers: [WorkspaceItemService],
})
export class WorkspaceItemModule {}
