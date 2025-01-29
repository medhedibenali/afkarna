import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { WorkspaceItem } from "../workspace/model/workspace-item";
import { WorkspaceItemService } from "../workspace/service/workspace-item.service";

@Component({
  selector: "app-tree-node",
  imports: [CommonModule],
  templateUrl: "./tree-node.component.html",
  styleUrl: "./tree-node.component.css",
})
export class TreeNodeComponent {
  @Input()
  node!: WorkspaceItem;

  stack: WorkspaceItem[] = sessionStorage.getItem("workspacesState")
    ? JSON.parse(sessionStorage.getItem("workspacesState")!).navigationStack
    : [];

  private workspaceItemService = inject(WorkspaceItemService);
  private selectedNodeSignal = this.workspaceItemService.selectedNodeSignal;

  constructor() {}

  ngOnInit() {
    const stack = this.stack.map((item) => item.id);

    if (stack.includes(this.node.id)) {
      this.node.show = !this.node.show;
      this.workspaceItemService
        .getWorkspaceItemsByParentId(this.node.id)
        .subscribe((collection) => {
          this.node.children = collection;
        });
    }
  }

  toggleFolder(): void {
    if (this.node.type === "collection") {
      this.node.show = !this.node.show;
      this.workspaceItemService
        .getWorkspaceItemsByParentId(this.node.id)
        .subscribe((collection) => {
          this.node.children = collection;
        });
    } else {
      this.selectedNodeSignal.set(this.node);
    }
  }
}
