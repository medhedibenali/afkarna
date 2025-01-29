import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-add-workspace-dialog",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: "./add-workspace-dialog.component.html",
  styleUrls: ["./add-workspace-dialog.component.css"],
  standalone: true,
})
export class AddWorkspaceDialogComponent {
  @Output()
  workspaceAdded = new EventEmitter<void>();
  @Output()
  workspaceItemAdded = new EventEmitter<void>();
  parentId?: string;

  workspaceForm: FormGroup;
  workspaceItemForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddWorkspaceDialogComponent>,
    private fb: FormBuilder,
    private workspaceService: WorkspaceService,
    private workspaceItemService: WorkspaceItemService,
    @Inject(MAT_DIALOG_DATA) public data: { parentId?: string },
  ) {
    this.workspaceForm = this.fb.group({
      name: ["", Validators.required],
    });

    this.workspaceItemForm = this.fb.group({
      name: ["", Validators.required],
      type: ["collection", Validators.required],
    });
    this.parentId = data.parentId;
  }

  onSubmit() {
    if (this.parentId) {
      if (this.workspaceItemForm.valid) {
        const newWorkspaceItem = {
          name: this.workspaceItemForm.value.name,
          type: this.workspaceItemForm.value.type,
          parentId: this.parentId,
        };

        this.workspaceItemService.createItem(newWorkspaceItem).subscribe(() => {
          this.workspaceItemAdded.emit();
          this.dialogRef.close(true);
        });
      }
    } else {
      if (this.workspaceForm.valid) {
        const newWorkspace = {
          name: this.workspaceForm.value.name,
        };

        this.workspaceService.createWorkspace(newWorkspace).subscribe(() => {
          this.workspaceAdded.emit();
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
