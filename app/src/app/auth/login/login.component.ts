import { Component, signal } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [FormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  onSubmit(_loginForm: NgForm) {}
}
