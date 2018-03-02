import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss']
})
export class TherapyComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'therapy';
  }

}
