import { TestBed } from "@angular/core/testing";

import { WorkspaceItemService } from "./workspace-item.service";

describe("WorkspaceItemService", () => {
  let service: WorkspaceItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceItemService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
