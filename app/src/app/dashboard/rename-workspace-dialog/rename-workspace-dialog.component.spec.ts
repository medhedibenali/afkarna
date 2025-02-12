import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RenameWorkspaceDialogComponent } from "./rename-workspace-dialog.component";

describe("RenameWorkspaceDialogComponent", () => {
  let component: RenameWorkspaceDialogComponent;
  let fixture: ComponentFixture<RenameWorkspaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameWorkspaceDialogComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RenameWorkspaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
