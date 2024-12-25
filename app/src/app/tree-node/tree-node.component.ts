import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  show?: boolean;
  children?: TreeNode[];
}


@Component({
  selector: 'app-tree-node',
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.css'
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;

  toggleFolder(): void {
    if (this.node.type === 'folder') {
      this.node.show = !this.node.show;
    }
  }

}
