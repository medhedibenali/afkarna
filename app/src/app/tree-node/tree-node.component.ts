import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkspaceItem } from '../workspace/model/workspace-item';
import { WorkspaceItemService } from '../workspace/service/workspace-item.service';


@Component({
  selector: 'app-tree-node',
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css'
})
export class TreeNodeComponent {
  @Input() node!: WorkspaceItem;

  constructor(private workspaceItemService: WorkspaceItemService) { }

  toggleFolder(): void {
    if (this.node.type === 'collection') {
      this.node.show = !this.node.show;
      this.workspaceItemService.getWorkspaceItemsByParentId(this.node.id).subscribe((collection) => {
        this.node.children = collection;
      });
    }    
  }

}
