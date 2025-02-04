import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Workspace } from "../../../workspace/model/workspace";
import { WorkspaceItem } from "../../../workspace/model/workspace-item";
import { InviteUserDialogComponent } from "../invite-user-dialog/invite-user-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { CommunicationSidebar } from "../../types/communication-sidebar.type";

@Component({
  selector: "app-header",
  imports: [RouterLink, MatIconModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  dialog = inject(MatDialog);

  workspace = input.required<Workspace>();
  note = input.required<WorkspaceItem | null>();

  readonly logo = "logo.png";

  sidebarToggle = output<CommunicationSidebar>();

  openInviteUserDialog() {
    const { id: workspaceId } = this.workspace();

    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      data: {
        workspaceId,
      },
    });

    dialogRef.afterClosed().subscribe();
  }

  toggleSidebar(communicationSidebar: CommunicationSidebar) {
    this.sidebarToggle.emit(communicationSidebar);
  }
}
