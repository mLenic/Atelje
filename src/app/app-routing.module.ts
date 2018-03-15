// Native Modules
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom components
import { HomeComponent }    from './home/home.component';
import { BlogComponent }    from './blog/blog.component';
import { AboutComponent }   from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { BlogpostComponent }    from './blogpost/blogpost.component';
import { RecordingComponent } from './recording/recording.component';
import { TherapyComponent } from './therapy/therapy.component';
import { AboutRecordingsComponent } from './about-recordings/about-recordings.component';
import { SelfConfidenceComponent } from './recordings/all-recordings/self-confidence/self-confidence.component';
import { MeComponent } from './recordings/all-recordings/me/me.component';
import { MyBodyComponent } from './recordings/all-recordings/my-body/my-body.component';

const routes: Routes = [
     { path: '',        redirectTo: '/domov',        pathMatch: 'full'   },
     { path: 'domov',    component: HomeComponent                        },
     { path: 'about',   component: AboutComponent                       },
     { path: 'contact', component: ContactComponent                     },
     { path: 'blog',    component: BlogComponent                        },
     { path: 'blogpost/:id',    component: BlogpostComponent                        },
     { path: 'blogpost',    component: BlogpostComponent                        },
     { path: 'recordings',    component: RecordingsComponent                        },
     { path: 'recording',    component: RecordingComponent                        },
     { path: 'therapy',    component: TherapyComponent                        },
     { path: 'about-recordings',    component: AboutRecordingsComponent                        },
     { path: 'recordings/self-confidence',    component: SelfConfidenceComponent                        },
     { path: 'recordings/my-body',    component: MyBodyComponent                        },
     { path: 'recordings/me',    component: MeComponent                        },
     { path: 'hidden',          loadChildren: './hidden/hidden.module#HiddenModule' },
     { path: '**',      component: HomeComponent                        }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {
}