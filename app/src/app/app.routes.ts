import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";

export const routes: Routes = [
    {
        path: "auth",
        pathMatch: "full",
        redirectTo: "auth/login",
    },
    {
        path: "auth",
        children: [
            { path: "login", component: LoginComponent },
            { path: "sign-up", component: SignUpComponent },
        ],
    },
];
