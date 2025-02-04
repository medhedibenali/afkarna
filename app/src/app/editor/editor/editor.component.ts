import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { TextareaComponent } from "../components/textarea/textarea.component";
import { HeaderComponent } from "../components/header/header.component";
import { WorkspaceService } from "../../workspace/service/workspace.service";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { WsService } from "../../ws/ws.service";
import { ChatComponent } from "../components/chat/chat.component";
import { CommunicationSidebar } from "../types/communication-sidebar.type";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-editor",
  imports: [
    SidebarComponent,
    CommonModule,
    TextareaComponent,
    HeaderComponent,
    ChatComponent,
  ],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  workspaceService = inject(WorkspaceService);
  workspaceItemService = inject(WorkspaceItemService);
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);
  wsService = inject(WsService);
  router = inject(Router);

  workspace$ = this.activatedRoute.params.pipe(
    map((params) => params["workspace"]),
    switchMap((workspace) => this.workspaceService.getWorkspaceById(workspace)),
    startWith(null),
    pairwise(),
    tap(([oldWorkspace, newWorkspace]) => {
      if (oldWorkspace) {
        this.wsService.emit("workspace:close", { workspace: oldWorkspace.id })
          .subscribe();
      }

      this.wsService.emit("workspace:open", { workspace: newWorkspace!.id })
        .subscribe(() => {
          this.chatService.workspace.set(newWorkspace!.id);
        });
    }),
    map(([, newWorkspace]) => newWorkspace!),
  );
  selectedNode = this.workspaceItemService.selectedNodeSignal;
  note$ = toObservable(this.selectedNode).pipe(
    filter((item) => item !== null && item.type === "note"),
    distinctUntilChanged(),
  );

  #communicationSidebar = signal<CommunicationSidebar>(null);
  communicationSidebarVisible = computed(() =>
    this.#communicationSidebar() !== null
  );
  chatVisible = computed(() => this.#communicationSidebar() === "chat");

  toggleCommunicationSidebar(newCommunicationSidebar: CommunicationSidebar) {
    if (this.#communicationSidebar() === newCommunicationSidebar) {
      return void this.#communicationSidebar.set(null);
    }

    this.#communicationSidebar.set(newCommunicationSidebar);
  }
}
