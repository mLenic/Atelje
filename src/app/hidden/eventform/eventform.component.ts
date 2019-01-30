import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'

import { HiddenService } from '../service/hidden.service';

@Component({
    selector: 'app-eventform',
    templateUrl: './eventform.component.html',
    styleUrls: ['./eventform.component.scss'],
})
export class EventformComponent implements OnInit {

  ngOnInit() {

  }
}
