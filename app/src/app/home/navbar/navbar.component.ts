import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private viewportScroller = inject(ViewportScroller);

  scrollTo(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
