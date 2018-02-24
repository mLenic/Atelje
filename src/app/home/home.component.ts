import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'home';
    this.generalService.printCurrentLink();
  }
}
