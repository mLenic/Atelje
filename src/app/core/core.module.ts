import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent }  from './navigation/navigation.component';
import { FooterComponent }  from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ]
})
export class CoreModule { }
