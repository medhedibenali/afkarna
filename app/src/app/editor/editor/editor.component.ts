import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { TextareaComponent } from "../components/textarea/textarea.component";
import { HeaderComponent } from "../components/header/header.component";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { WsService } from "../../ws/ws.service";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { InviteUserDialogComponent } from "../components/invite-user-dialog/invite-user-dialog.component";
import { Workspace } from "../../workspace/model/workspace";

@Component({
  selector: "app-editor",
  imports: [
    SidebarComponent,
    CommonModule,
    TextareaComponent,
    HeaderComponent,
    MatIconModule,
  ],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  workspaceService = inject(WorkspaceService);
  workspaceItemService = inject(WorkspaceItemService);
  activatedRoute = inject(ActivatedRoute);
  wsService = inject(WsService);
  dialog = inject(MatDialog);
  router = inject(Router);

  workspace$ = this.activatedRoute.params.pipe(
    map((params) => params["workspace"]),
    switchMap((workspaceId) =>
      this.workspaceService.getWorkspaceById(workspaceId)
    ),
  );
  selectedNode = this.workspaceItemService.selectedNodeSignal;
  note$ = toObservable(this.selectedNode).pipe(
    filter((item) => item !== null && item.type === "note"),
    distinctUntilChanged(),
  );

  navigationStack!: unknown[];

  constructor() {
    const state = sessionStorage.getItem("editorState");

    if (!state) {
      return;
    }

    const { navigationStack } = JSON.parse(state);

    if (navigationStack.length > 0) {
      this.navigationStack = navigationStack;
    }
  }

  openInviteUserDialog({ id: workspaceId }: Workspace) {
    const state = sessionStorage.getItem("editorState");

    if (state) {
      const { navigationStack } = JSON.parse(state);
      this.navigationStack = navigationStack;
    }

    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      data: {
        workspaceId,
      },
    });

    dialogRef.afterClosed().subscribe();
  }
}
