import { Component, Input, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { IsActiveMatchOptions, Router, RouterModule } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddWorkspaceDialogComponent } from "../add-workspace-dialog/add-workspace-dialog.component";

export type MenuItem = {
  icon: string;
  name: string;
  route: string;
};

@Component({
  selector: "app-custom-sidenav",
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: "./custom-sidenav.component.html",
  styleUrls: ["./custom-sidenav.component.css"],
  standalone: true,
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal<boolean>(false);
  private navigationStack: any;

  @Input()
  set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  menuItems = signal<MenuItem[]>([
    { icon: "workspaces", name: "Workspaces", route: "/workspaces" },
    {
      icon: "people",
      name: "Shared with me",
      route: "/shared-with-me",
    },
  ]);

  constructor(private dialog: MatDialog, private router: Router) {
    const state = sessionStorage.getItem("workspacesState");
    if (state) {
      const { currentItems, navigationStack } = JSON.parse(state);
      if (navigationStack.length > 0) {
        this.navigationStack = navigationStack;
      }
    }
  }

  openAddWorkspaceDialog() {
    const state = sessionStorage.getItem("workspacesState");
    if (state) {
      const { currentItems, navigationStack } = JSON.parse(state);
      this.navigationStack = navigationStack;
    }
    const dialogRef = this.dialog.open(AddWorkspaceDialogComponent, {
      data: {
        parentId: this.navigationStack && this.navigationStack.length > 0
          ? this.navigationStack[this.navigationStack.length - 1].id
          : null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  get isWorkspacesActive(): boolean {
    const options: IsActiveMatchOptions = {
      paths: "exact",
      queryParams: "ignored",
      fragment: "ignored",
      matrixParams: "ignored",
    };
    return this.router.isActive("/workspaces", options);
  }
}
