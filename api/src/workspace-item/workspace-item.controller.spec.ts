import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceItemController } from './workspace-item.controller';
import { WorkspaceItemService } from './workspace-item.service';

describe('WorkspaceItemController', () => {
  let controller: WorkspaceItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceItemController],
      providers: [WorkspaceItemService],
    }).compile();

    controller = module.get<WorkspaceItemController>(WorkspaceItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
