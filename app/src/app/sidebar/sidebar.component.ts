import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';


interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  show?: boolean  
  children?: TreeNode[]; 
}


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,TreeNodeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  treeData: TreeNode[] = [
    {
      name: 'Documents',
      type: 'folder',
      show: false, 
      children: [
        { name: 'file1.txt', type: 'file' },
        { name: 'file2.txt', type: 'file' },
        {
          name: 'Reports',
          type: 'folder',
          show: false,
          children: [
            { name: 'report1.pdf', type: 'file' },
            { name: 'report2.pdf', type: 'file' },
            {
              name: 'Reports',
              type: 'folder',
              show: false,
              children: [
                { name: 'report1.pdf', type: 'file' },
                { name: 'report2.pdf', type: 'file' },
              ],
            }
          ],
        },
      ],
    },
    {
      name: 'Pictures',
      type: 'folder',
      show: false,
      children: [
        { name: 'image1.jpg', type: 'file' },
        { name: 'image2.png', type: 'file' },
      ],
    },
  ];

}
