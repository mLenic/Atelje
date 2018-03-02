import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-about-recordings',
  templateUrl: './about-recordings.component.html',
  styleUrls: ['./about-recordings.component.scss']
})
export class AboutRecordingsComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'hypnosis';
    this.generalService.currentHypnosisSublink = 'about-recordings';
  }

}
