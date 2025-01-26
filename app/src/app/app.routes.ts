import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { EditorComponent } from "./editor/editor/editor.component";
import { LayoutComponent } from "./dashboard/layout/layout.component";
import { WorkspacesListComponent } from "./dashboard/workspaces-list/workspaces-list.component";
import { SharedWithMeComponent } from "./dashboard/shared-with-me/shared-with-me.component";
import { CommentComponent } from "./comment/comment.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
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
  {
    path: "editor/:workspace",
    component: EditorComponent,
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "workspaces", pathMatch: "full" },
      { path: "workspaces", component: WorkspacesListComponent },
      { path: "shared_with_me", component: SharedWithMeComponent },
    ],
  },
  {path:"comment",component:CommentComponent},
];
