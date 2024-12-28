import { Component, Signal, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { emailExistsValidator } from '../validators/emailExists.validators';
import { userNameExistsValidator } from '../validators/userNameExists.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent {

  form: FormGroup;
  passwordVisible = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', 
        Validators.required
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ], [
        emailExistsValidator(this.authService)
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ], [
        userNameExistsValidator(this.authService)
      ]],
      password: ['', [
        Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$#]).{8,}$/)
      ]]
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }

  get email(): AbstractControl {
    return this.form.get("email")!;
  }

  get userName(): AbstractControl {
    return this.form.get("userName")!;
  }

  get password(): AbstractControl {
    return this.form.get("password")!;
  }

  signUp(): void {
    if (this.form.invalid) {
      return;
    }
    const { name, email, userName, password } = this.form.value;
    /*
    this.authService.signUp(name, email, userName, password);
    this.router.navigate(['/home']);
    */
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('email')) {
      return 'Not a valid email';
    }

    if (control.hasError('minlength')) {
      return 'Must be at least 3 characters';
    }

    if (control.hasError('pattern')) {
      return 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    }

    if (control.hasError('emailExists')) {
      return 'Email already exists';
    }

    if (control.hasError('userNameExists')) {
      return 'Username already exists';
    }
    return '';
  } 
}
