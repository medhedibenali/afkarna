import { Component, inject } from "@angular/core";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { User } from "../../../users/models/user.model";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-profile",
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  profile$ = this.profileService.profile$;

  placeholder({ name }: User) {
    return name.split(" ")
      .splice(0, 2)
      .map((c: string) => c[0].toUpperCase())
      .join("");
  }

  profilePicture({ profilePicture }: User) {
    return `${environment.apiUrl}/assets/${profilePicture}`;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      sessionStorage.clear();

      this.router.navigate(["/auth/login"]);
    });
  }
}
