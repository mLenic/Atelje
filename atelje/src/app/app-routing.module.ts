// Native Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom components
import { HomeComponent } from './home/home.component';

const routes: Routes = [
     { path: '',        redirectTo: '/home',        pathMatch: 'full'   },
     { path: 'home',    component: HomeComponent                        },
     { path: '**',      component: HomeComponent                        }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {
}