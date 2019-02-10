import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'zvocniposnetki';
    //this.generalService.currentHypnosisSublink = 'recordings';
  }

}
