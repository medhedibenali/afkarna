import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { CommonModule } from "@angular/common";
import { WorkspaceItem } from "../../workspace/model/workspace-item";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { Workspace } from "../../workspace/model/workspace";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmDeleteDialogComponent } from "../cofirm-delete-dialog/confirm-delete-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-workspaces-list",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: "./workspaces-list.component.html",
  styleUrls: ["./workspaces-list.component.css"],
})
export class WorkspacesListComponent implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private dialog: MatDialog,
  ) {}
  private workspaceItemService = inject(WorkspaceItemService);
  router = inject(Router);

  workspaces = signal<Workspace[]>([]);
  currentItems = signal<WorkspaceItem[]>([]);
  navigationStack = signal<WorkspaceItem[]>([]);

  contextMenuPosition = { x: "0px", y: "0px" };

  currentPath = computed(() => {
    const stack = this.navigationStack();
    return stack.length > 0
      ? stack.map((item) => item.name).join(" / ")
      : "Workspaces";
  });

  ngOnInit() {
    this.loadWorkspaces();

    this.workspaceService.newWorkspace$.subscribe(() => {
      this.loadWorkspaces();
    });
    this.workspaceItemService.newItem$.subscribe((newItem) => {
      this.loadCollectionContents(newItem.parent.id);
    });
  }

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  onRightClick(event: MouseEvent, item: Workspace | WorkspaceItem) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu?.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  openInEditor(item: WorkspaceItem) {
    if (item.workspace) {
      this.router.navigate(["/editor", item.workspace.id]);
    }else{
      this.router.navigate(["/editor", this.workspaceService.selectedWorkspace()?.id]);
    }
  }

  edit(item: Workspace | WorkspaceItem) {
    // Implement logic to edit the item
  }

  confirmDelete(item: WorkspaceItem) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteItem(item);
      }
    });
  }

  deleteItem(item: WorkspaceItem) {
    this.workspaceItemService.deleteItem(item.id).subscribe(() => {
      this.currentItems.update((stack) =>
        stack.filter((stackItem) => stackItem.id !== item.id)
      );
      if (this.navigationStack().length > 0) {
        this.loadCollectionContents(
          this.navigationStack()[this.navigationStack().length - 1].id,
        );
      } else {
        this.loadWorkspaces();
      }
      this.saveState();
    });
  }

  private loadWorkspaces() {
    const savedState = sessionStorage.getItem("workspacesState");
    if (!savedState || JSON.parse(savedState).navigationStack.length == 0) {
      this.workspaceService.getWorkspaces().subscribe((response) => {
        this.workspaces.set(response.data);
        const rootCollections = response.data.map(
          (workspace) => {
            return {
              ...workspace.collection,
              workspace: workspace,
            };
          },
        );
        this.currentItems.set(rootCollections);
        this.navigationStack.set([]);
      });
    } else {
      this.restoreState(savedState);
    }
  }

  private saveState() {
    const state = {
      navigationStack: this.navigationStack(),
      currentItems: this.currentItems(),
    };
    sessionStorage.setItem("workspacesState", JSON.stringify(state));
  }

  private restoreState(savedState: string) {
    const { navigationStack, currentItems } = JSON.parse(savedState);
    this.navigationStack.set(navigationStack);
    this.currentItems.set(currentItems);

    if (navigationStack.length > 0) {
      const lastItem = navigationStack[navigationStack.length - 1];
      this.loadCollectionContents(lastItem.id);
    }
  }

  getItemIcon(item: WorkspaceItem): string {
    switch (item.type.toLowerCase()) {
      case "collection":
        return "folder";
      case "note":
        return "description";
      default:
        return "insert_drive_file";
    }
  }

  handleItemClick(item: WorkspaceItem) {
    if (item.type.toLowerCase() === "collection") {
      this.navigationStack.update((stack) => [...stack, item]);
      this.loadCollectionContents(item.id);
      item.show = !item.show;
      this.saveState();
      if (item.workspace) {
        this.workspaceService.selectedWorkspace.set(item.workspace);
      }
      
    } else if (item.type.toLowerCase() === "note") {
    }
  }

  private loadCollectionContents(collectionId: string) {
    this.workspaceItemService
      .getWorkspaceItemsByParentId(collectionId)
      .subscribe((items) => {
        this.currentItems.set(items);
        this.saveState();
      });
  }

  navigateUp() {
    if (this.navigationStack().length > 0) {
      const newStack = [...this.navigationStack()];
      newStack.pop();
      this.navigationStack.set(newStack);
      this.saveState();
      if (newStack.length === 0) {
        if (this.workspaces().length > 0) {
          const rootCollections = this.workspaces().map(
            (workspace) => workspace.collection,
          );
          this.currentItems.set(rootCollections);
          this.saveState();
        } else {
          this.loadWorkspaces();
        }
      } else {
        const lastItem = newStack[newStack.length - 1];
        this.loadCollectionContents(lastItem.id);
      }
    }
  }
}
