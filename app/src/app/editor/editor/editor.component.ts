import { Component, inject } from "@angular/core";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent {
  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;

  constructor() {}
}
