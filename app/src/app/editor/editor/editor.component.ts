import { Component, inject } from "@angular/core";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "../components/chat/chat.component";
import { ActivatedRoute } from "@angular/router";
import { WsService } from "../../ws/ws.service";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [SidebarComponent,ChatComponent, CommonModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent {
  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;
  activatedRoute = inject(ActivatedRoute);
  wsService = inject(WsService);

  worksapceId = this.activatedRoute.snapshot.params['workspace'];

  constructor() {
    this.wsService.emit("workspace:open", { workspaceId: this.worksapceId }).subscribe();

  }
}
