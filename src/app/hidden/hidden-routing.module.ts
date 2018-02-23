//Routing file for Login and blog upload
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BlogformComponent } from './blogform/blogform.component';

import { AuthGuard } from '../hidden/guard/auth.guard';

const routes: Routes = [
    { path: 'login',        component: LoginComponent    },
    { path: 'blogpost',     component: BlogformComponent, canActivate: [AuthGuard] },
];
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class HiddenRoutingModule {}