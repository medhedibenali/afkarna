import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { emailExistsValidator } from "../validators/email-exists.validators";
import { usernameExistsValidator } from "../validators/username-exists.validators";
import { SignUpDto } from "../dtos/sign-up.dto";

@Component({
  selector: "app-sign-up",
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", [
      Validators.required,
      Validators.email,
    ], [
      emailExistsValidator(this.authService),
    ]],
    username: ["", [
      Validators.required,
      Validators.minLength(3),
    ], [
      usernameExistsValidator(this.authService),
    ]],
    password: ["", [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$#]).{8,}$/),
    ]],
  });

  signUp() {
    if (!this.form.valid) {
      return;
    }

    this.authService.signUp(this.form.value as SignUpDto).subscribe(() => {
      this.router.navigate([""]);
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }

  get email(): AbstractControl {
    return this.form.get("email")!;
  }

  get username(): AbstractControl {
    return this.form.get("username")!;
  }

  get password(): AbstractControl {
    return this.form.get("password")!;
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError("required")) {
      return "You must enter a value";
    }

    if (control.hasError("email")) {
      return "Not a valid email";
    }

    if (control.hasError("minlength")) {
      return "Must be at least 3 characters";
    }

    if (control.hasError("pattern")) {
      return "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
    }

    if (control.hasError("emailExists")) {
      return "Email already exists";
    }

    if (control.hasError("usernameExists")) {
      return "Username already exists";
    }

    return "";
  }
}
