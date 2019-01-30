import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Custom modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule }       from './core/core.module';
import { HiddenModule }     from './hidden/hidden.module';

//Custom Components
import { AppComponent }   from './app.component';
import { HomeComponent }  from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { EventComponent } from './event/event.component';
import { EventpostComponent } from './eventpost/eventpost.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { FooterComponent } from './core/footer/footer.component';
import { QuestionsAnswersRowComponent } from './core/questions-answers-row/questions-answers-row.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { RecordingComponent } from './recording/recording.component';
import { SelfConfidenceComponent } from './recordings/all-recordings/self-confidence/self-confidence.component';
import { MeComponent } from './recordings/all-recordings/me/me.component';
import { MyBodyComponent } from './recordings/all-recordings/my-body/my-body.component';

//Custom Services
import { ContactService } from './contact/contact.service';
import { GeneralService } from './core/service/general.service';
import { TherapyComponent } from './therapy/therapy.component';
import { AboutRecordingsComponent } from './about-recordings/about-recordings.component';

import { Globals } from '../../globals';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    EventComponent,
    EventpostComponent,
    RecordingsComponent,
    BlogpostComponent,
    RecordingComponent,
    TherapyComponent,
    AboutRecordingsComponent,
    SelfConfidenceComponent,
    MeComponent,
    MyBodyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    AngularFontAwesomeModule,
    HiddenModule,
  ],
  providers: [
    ContactService,
    GeneralService,
    Globals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
