import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { WorkspaceItemService } from '../workspace/service/workspace-item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  selectedNodeSignal = inject(WorkspaceItemService).selectedNodeSignal;

  constructor() {}

}
