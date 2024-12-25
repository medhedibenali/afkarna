import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceItemService } from './workspace-item.service';

describe('WorkspaceItemService', () => {
  let service: WorkspaceItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceItemService],
    }).compile();

    service = module.get<WorkspaceItemService>(WorkspaceItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
