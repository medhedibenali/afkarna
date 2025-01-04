import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomSidenavComponent } from "../custom-sidenav/custom-sidenav.component";


@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, CustomSidenavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: true,
})
export class LayoutComponent {
  collapsed = signal<boolean>(false);

  sidenavWidth = computed(() => this.collapsed() ? '64px' : '250px');
}
