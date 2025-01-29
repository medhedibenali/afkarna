import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { WorkspaceItemService } from "../../workspace/service/workspace-item.service";
import { TextareaComponent } from "../components/textarea/textarea.component";
import { HeaderComponent } from "../components/header/header.component";
import { ActivatedRoute } from "@angular/router";

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
})
export class EditorComponent {
  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;
  activatedRoute = inject(ActivatedRoute);

  workspaceId = this.activatedRoute.snapshot.params["workspace"];

  workspace = signal({ id: this.workspaceId, name: "Workspace Title" });
}
