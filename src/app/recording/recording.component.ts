import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'hypnosis';
    this.generalService.currentHypnosisSublink = 'recording';
  }

}
