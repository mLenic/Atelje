// Native Modules
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom components
import { HomeComponent }    from './home/home.component';
import { BlogComponent }    from './blog/blog.component';
import { EventComponent }   from './event/event.component';
import { EventpostComponent } from './eventpost/eventpost.component';
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
     { path: '',                                        component: HomeComponent                            },
     { path: 'hipnoza',                                 component: AboutComponent                           },
     { path: 'kontakt',                                 component: ContactComponent                         },
     { path: 'dogodki',                                 component: EventComponent                           },
     { path: 'dogodek/:id',                             component: EventpostComponent                       },
     { path: 'omeni',                                 component: TherapyComponent                         },
     //{ path: 'blog',                                    component: BlogComponent                            },
     //{ path: 'blog/:id',                                component: BlogpostComponent                        },
     //{ path: 'blogpost',                                component: BlogpostComponent                        },
     //{ path: 'zvocniposnetki',                          component: RecordingsComponent                      },
     //{ path: 'recording',                               component: RecordingComponent                       },

     //{ path: 'oposnetkih',                              component: AboutRecordingsComponent                 },
     //{ path: 'zvocniposnetki/samozavest',               component: SelfConfidenceComponent                  },
     ///{ path: 'zvocniposnetki/mojetelo',                 component: MyBodyComponent                          },
     //{ path: 'zvocniposnetki/jaz',                      component: MeComponent                              },
     //{ path: 'hidden',                                  loadChildren: './hidden/hidden.module#HiddenModule' },
     { path: '**',                                      component: HomeComponent                            }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {
}
