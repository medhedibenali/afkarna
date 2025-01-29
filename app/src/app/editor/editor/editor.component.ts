import { Component, inject } from "@angular/core";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

import { WsService } from "../../ws/ws.service";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { InviteUserDialogComponent } from "../components/invite-user-dialog/invite-user-dialog.component";


@Component({
  selector: "app-editor",
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatIconModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent {
  workspaceId = inject(ActivatedRoute).snapshot.params['workspace'];
  messages = inject(WsService).fromEvent("notification:new").subscribe(data => {
    console.log(data);
  });
  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;

  private navigationStack: any;
  constructor(private dialog: MatDialog, private router: Router) {
    const state = sessionStorage.getItem("editorState");
    if (state) {
      const { currentItems, navigationStack } = JSON.parse(state);
      if (navigationStack.length > 0) {
        this.navigationStack = navigationStack;
      }
    }
  }

  router = inject(ActivatedRoute);
  workspaceId: string = this.router.snapshot.params["workspace"];


  openInviteUserDialog() {
     const state = sessionStorage.getItem("editorState");
        if (state) {
          const { currentItems, navigationStack } = JSON.parse(state);
          this.navigationStack = navigationStack;
        }
        const dialogRef = this.dialog.open(InviteUserDialogComponent, {
          data: {
            workspaceId: this.workspaceId
          },
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
          }
        });
  }
}
