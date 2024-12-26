import { Component, Signal, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent {
  email = signal('');
  username = signal('');
  password = signal('');
  name = signal('');

  nameError = signal<null | string>(null);
  emailError = signal<null | string>(null);
  usernameError = signal<null | string>(null);
  passwordError = signal<null | string>(null);

  passwordVisible = signal(false);

  onNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
    this.validateName();
  }

  onEmailInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
    this.validateEmail();
  }

  onUsernameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
    this.validateUsername();
  }

  onPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
    this.validatePassword();
  }

  validateName() {
    if (!this.name()) {
      this.nameError.set('required');
    } else {
      this.nameError.set(null);
    }
  }

  validateEmail() {
    if (!this.email()) {
      this.emailError.set('required');
    } else if (!this.isValidEmail(this.email())) {
      this.emailError.set('invalid');
    } else {
      this.emailError.set(null);
    }
  }

  validateUsername() {
    if (!this.username()) {
      this.usernameError.set('required');
    } else if (this.username().length < 3) {
      this.usernameError.set('invalid');
    }else {
      this.usernameError.set(null);
    }
  }

  validatePassword() {
    if (this.password().length < 8) {
      this.passwordError.set('invalid');
    } else {
      this.passwordError.set(null);
    }
  }

  isValidEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  formInvalid() {
    return !this.name() || !this.email() || !this.username() || !this.password() || this.nameError() || this.emailError() || this.usernameError() || this.passwordError();
  }

  onSubmit() {
    if (!this.formInvalid()) {
      /*console.log('Form submitted');*/
    }
  }
}
