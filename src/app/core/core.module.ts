import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent }  from './navigation/navigation.component';
import { FooterComponent }  from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogService } from './service/blog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlogService,
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
