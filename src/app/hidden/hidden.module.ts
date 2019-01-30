import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HiddenRoutingModule } from './hidden-routing.module';

import { LoginComponent } from './login/login.component';
import { BlogformComponent } from './blogform/blogform.component';
import { EventformComponent } from './eventform/eventform.component';

import { HiddenService } from './service/hidden.service';

import { AuthGuard } from './guard/auth.guard';

@NgModule({
    declarations: [
        LoginComponent,
        BlogformComponent,
        EventformComponent
    ],
    imports: [
        CommonModule,
        HiddenRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [
        HiddenService,
        AuthGuard
    ],
})
export class HiddenModule {}
