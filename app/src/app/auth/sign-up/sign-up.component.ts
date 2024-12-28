import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "../auth.service";
import { emailExistsValidator } from "../validators/email-exists.validators";
import { usernameExistsValidator } from "../validators/username-exists.validators";

@Component({
  selector: "app-sign-up",
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
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

  signUp() {}

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
