import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LoginDto } from "../dtos/login.dto";

@Component({
  selector: "app-login",
  imports: [FormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.authService.login(form.value as LoginDto).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
