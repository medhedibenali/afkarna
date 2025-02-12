import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { WorkspaceItem } from "../../workspace/model/workspace-item";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";

@Component({
  selector: "app-rename-workspace-dialog",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: "./rename-workspace-dialog.component.html",
  styleUrls: ["./rename-workspace-dialog.component.css"],
})
export class RenameWorkspaceDialogComponent {
  item: WorkspaceItem;
  isWorkspace: boolean;

  renameForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RenameWorkspaceDialogComponent>,
    private fb: FormBuilder,
    private workspaceService: WorkspaceService,
    private workspaceItemService: WorkspaceItemService,
    @Inject(MAT_DIALOG_DATA) public data: WorkspaceItem,
  ) {
    this.item = data;
    this.isWorkspace = !!data.workspace;
    this.renameForm = this.fb.group({
      name: [data.name, Validators.required],
    });
  }

  onSubmit() {
    if (this.renameForm.dirty && this.renameForm.valid) {
      const newName = this.renameForm.value.name;

      if (this.item.workspace) {
        this.workspaceService.updateWorkspaceName(
          this.item.workspace.id,
          this.item.id,
          newName,
        ).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error("Error updating workspace name:", error);
            this.dialogRef.close(false);
          },
        });
      } else {
        this.workspaceItemService.updateItemName(this.item.id, newName)
          .subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: (error) => {
              console.error("Error updating item name:", error);
              this.dialogRef.close(false);
            },
          });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
