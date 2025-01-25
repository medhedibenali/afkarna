import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { NavbarComponent } from "./home/navbar/navbar.component";
import { FirstPageComponent } from "./home/first-page/first-page.component";
import { FeaturesPageComponent } from "./home/features-page/features-page.component";
import { ContactPageComponent } from "./home/contact-page/contact-page.component";

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
    {path:"nav",component:NavbarComponent},

    {path:"first",component:FirstPageComponent},

    {path:"features",component:FeaturesPageComponent},
    {path:"contact",component:ContactPageComponent},


    {
        path: "", component:HomepageComponent
    },
];
