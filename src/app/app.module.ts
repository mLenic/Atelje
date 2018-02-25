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
import { NavigationComponent } from './core/navigation/navigation.component';
import { FooterComponent } from './core/footer/footer.component';

//Custom Services
import { ContactService } from './contact/contact.service';
import { RecordingsComponent } from './recordings/recordings.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { GeneralService } from './core/service/general.service';
import { RecordingComponent } from './recording/recording.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BlogComponent,
    RecordingsComponent,
    BlogpostComponent,
    RecordingComponent,
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
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
