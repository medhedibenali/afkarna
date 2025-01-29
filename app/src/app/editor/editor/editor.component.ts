import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { TextareaComponent } from "../components/textarea/textarea.component";
import { HeaderComponent } from "../components/header/header.component";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-editor",
  imports: [
    SidebarComponent,
    CommonModule,
    TextareaComponent,
    HeaderComponent,
  ],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  workspaceService = inject(WorkspaceService);
  workspaceItemService = inject(WorkspaceItemService);
  activatedRoute = inject(ActivatedRoute);

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
}
