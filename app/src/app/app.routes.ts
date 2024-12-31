import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path:"home",
        component:TestComponent
    }
];
