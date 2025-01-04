import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { WorkspacesListComponent } from './dashboard/workspaces-list/workspaces-list.component';
import { SharedWithMeComponent } from './dashboard/shared-with-me/shared-with-me.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path:"editor",
        component:TestComponent
    },
    {
        path:"dashboard",
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'workspaces', pathMatch: 'full' },
            { path: 'workspaces', component: WorkspacesListComponent },
            { path: 'shared_with_me', component: SharedWithMeComponent}
        ]
    }
];
