import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TreeNodeComponent } from "../../../tree-node/tree-node.component";
import { Workspace } from "../../../workspace/model/workspace";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  workspace = input.required<Workspace>();
}
