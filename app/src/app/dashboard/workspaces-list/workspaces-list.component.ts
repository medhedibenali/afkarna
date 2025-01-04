import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  ViewChild,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { WorkspaceItem } from '../../workspace/model/workspace-item';
import { WorkspaceService } from '../../workspace/service/workspace.service';
import { WorkspaceItemService } from '../../workspace/service/workspace-item.service';
import { Workspace } from '../../workspace/model/workspace';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../cofirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-workspaces-list',
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
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.css'],
})
export class WorkspacesListComponent implements OnInit {
  constructor(
    private workspaceService: WorkspaceService,
    private dialog: MatDialog
  ) {}
  private workspaceItemService = inject(WorkspaceItemService);

  workspaces = signal<Workspace[]>([]);
  currentItems = signal<WorkspaceItem[]>([]);
  navigationStack = signal<WorkspaceItem[]>([]);

  contextMenuPosition = { x: '0px', y: '0px' };

  currentPath = computed(() => {
    const stack = this.navigationStack();
    return stack.length > 0
      ? stack.map((item) => item.name).join(' / ')
      : 'Workspaces';
  });

  ngOnInit() {
    this.loadWorkspaces();

    this.workspaceService.newWorkspace$.subscribe((newWorkspace) => {
      console.log('New workspace added:', newWorkspace);
      this.loadWorkspaces();
    });
    this.workspaceItemService.newItem$.subscribe((newItem) => {
      console.log('New item added:', newItem);
      this.loadCollectionContents(newItem.parent.id);
    });
  }

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  onRightClick(event: MouseEvent, item: Workspace | WorkspaceItem) {
    console.log('Right-clicked:', item);
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  openInEditor(item: Workspace | WorkspaceItem) {
    console.log('Opening in editor:', item);
    // Implement logic to open the item in an editor
  }

  edit(item: Workspace | WorkspaceItem) {
    console.log('Editing item:', item);
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

  deleteItem(item: Workspace | WorkspaceItem) {
    console.log('Deleting item:', item);
    // Implement logic to delete the item
  }

  private loadWorkspaces() {
    const savedState = sessionStorage.getItem('workspacesState');
    if (!savedState || JSON.parse(savedState).navigationStack.length == 0) {
      this.workspaceService.getWorkspaces().subscribe((response) => {
        this.workspaces.set(response.data);
        console.log('Workspaces:', response.data);
        const rootCollections = response.data.map(
          (workspace) => workspace.collection
        );
        this.currentItems.set(rootCollections);
        this.navigationStack.set([]);
      });
    } else {
      console.log('Restoring state:', savedState);
      this.restoreState(savedState);
    }
  }

  private saveState() {
    const state = {
      navigationStack: this.navigationStack(),
      currentItems: this.currentItems(),
    };
    sessionStorage.setItem('workspacesState', JSON.stringify(state));
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
      case 'collection':
        return 'folder';
      case 'note':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  handleItemClick(item: WorkspaceItem) {
    if (item.type.toLowerCase() === 'collection') {
      this.navigationStack.update((stack) => [...stack, item]);
      this.loadCollectionContents(item.id);
      item.show = !item.show;
      this.saveState();
    } else if (item.type.toLowerCase() === 'note') {
      console.log('Note clicked:', item);
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
    console.log(this.navigationStack().length);

    if (this.navigationStack().length > 0) {
      console.log('Navigating up1');
      const newStack = [...this.navigationStack()];
      newStack.pop();
      this.navigationStack.set(newStack);

      this.saveState();

      if (newStack.length === 0) {
        console.log('Navigating up12');
        console.log('Workspaces:', this.workspaces());
        if (this.workspaces().length > 0) {
          const rootCollections = this.workspaces().map(
            (workspace) => workspace.collection
          );
          console.log('Root collections:', rootCollections);
          this.currentItems.set(rootCollections);
        } else {
          this.loadWorkspaces();
        }
      } else {
        console.log('Navigating up2');
        const lastItem = newStack[newStack.length - 1];
        console.log('last', lastItem);
        this.loadCollectionContents(lastItem.id);
      }
    }
  }
}
