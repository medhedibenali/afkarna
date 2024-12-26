import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
    { path: 'signUp', component: SignupComponent },
    { path: 'login', component: LoginComponent }

];
