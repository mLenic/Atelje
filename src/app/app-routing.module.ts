// Native Modules
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom components
import { HomeComponent }    from './home/home.component';
import { BlogComponent }    from './blog/blog.component';
import { AboutComponent }   from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
     { path: '',        redirectTo: '/domov',        pathMatch: 'full'   },
     { path: 'domov',    component: HomeComponent                        },
     { path: 'about',   component: AboutComponent                       },
     { path: 'contact', component: ContactComponent                     },
     { path: 'blog',    component: BlogComponent                        },
     { path: '**',      component: HomeComponent                        }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {
}