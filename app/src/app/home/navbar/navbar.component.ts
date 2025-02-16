import { ViewportScroller } from "@angular/common";
import { Component, inject, Signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { routes } from "../../app.routes";

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  private viewportScroller = inject(ViewportScroller);
  private authService = inject(AuthService);
  private router = inject(Router);

  isAuthenticated= this.authService.isAuthenticated;

  scrollTo(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
