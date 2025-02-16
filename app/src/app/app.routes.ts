import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { EditorComponent } from "./editor/editor/editor.component";
import { LayoutComponent } from "./dashboard/layout/layout.component";
import { WorkspacesListComponent } from "./dashboard/workspaces-list/workspaces-list.component";
import { SharedWithMeComponent } from "./dashboard/shared-with-me/shared-with-me.component";
import { isNotAuthenticatedCanMatchGuard } from "./auth/guards/is-not-authenticated-can-match.guard";
import { isNotAuthenticatedCanActivateChildGuard } from "./auth/guards/is-not-authenticated-can-activate-child.guard";
import { isAuthenticatedCanActivateChildGuard } from "./auth/guards/is-authenticated-can-activate-child.guard";
import { isAuthenticatedCanActivateGuard } from "./auth/guards/is-authenticated-can-activate.guard";

export const routes: Routes = [
  {
    path: "",
    canMatch: [isNotAuthenticatedCanMatchGuard],
    component: HomepageComponent,
  },
  {
    path: "auth",
    canActivateChild: [isNotAuthenticatedCanActivateChildGuard],
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "sign-up", component: SignUpComponent },
    ],
  },
  {
    path: "",
    canActivateChild: [isAuthenticatedCanActivateChildGuard],
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "workspaces", pathMatch: "full" },
      { path: "workspaces", component: WorkspacesListComponent },
      { path: "shared-with-me", component: SharedWithMeComponent },
    ],
  },
  {
    path: "editor/:workspace",
    canActivate: [isAuthenticatedCanActivateGuard],
    component: EditorComponent,
  },
];
