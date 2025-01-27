import { Component, inject } from "@angular/core";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { WsService } from "../../ws/ws.service";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent {
  workspaceId = inject(ActivatedRoute).snapshot.params['workspace'];
  messages = inject(WsService).fromEvent("user:da856cd0-95e9-4ef0-a0ff-478db0c3a0a9").subscribe(data => {
    console.log(data);
  });
  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;
  constructor() {}
}
