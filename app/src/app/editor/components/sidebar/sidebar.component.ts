import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TreeNodeComponent } from "../../../tree-node/tree-node.component";
import { Workspace } from "../../../workspace/model/workspace";
import { WorkspaceService } from "../../../workspace/service/workspace.service";
import { WorkspaceItem } from "../../../workspace/model/workspace-item";
import { WorkspaceItemService } from "../../../workspace/service/workspace-item.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  workspace!: Workspace;
  @Input()
  workspaceId!: string;
  treeData!: WorkspaceItem[];

  constructor(
    private workspaceService: WorkspaceService,
    private workspaceItemService: WorkspaceItemService,
  ) {}

  ngOnInit() {    

    this.workspaceService.getWorkspaceById(this.workspaceId).subscribe(
      (workspace) => {
        this.workspace = workspace;
        const collectionId = workspace.collection.id;
        this.workspaceItemService.getWorkspaceItemById(collectionId).subscribe(
          (collection) => {
            this.treeData = [collection];
          },
        );
      },
    );
  }
}
