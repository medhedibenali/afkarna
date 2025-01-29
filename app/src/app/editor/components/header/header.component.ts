import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Workspace } from "../../../workspace/model/workspace";
import { WorkspaceItem } from "../../../workspace/model/workspace-item";

@Component({
  selector: "app-header",
  imports: [RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  workspace = input.required<Workspace>();
  note = input.required<WorkspaceItem | null>();
  logo = "logo.png";
}
