import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../../core/service/general.service';

@Component({
  selector: 'app-recordings-self-confidence',
  templateUrl: '../all-recordings.component.html',
  styleUrls: ['../all-recordings.component.scss']
})
export class SelfConfidenceComponent implements OnInit {
  recordingTitle: String = 'Samozavest';
  currentlyShownElement = null;
  recordings: any[] = [
    
    {
      "title": "Veličastno Drevo",
      "description": "Ta kategorijitivne samopodobe. Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe. Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe.",
      "show": true
    },
    {
      "title": "Varna Soba",
      "description": "Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe. Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe. Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe.",
      "show": false
    },
  ]
  recordingDescription: any[] = [
    {
      "text": "Ta kategorija zajema tehnike  za večanje samozavesti, samozaupanja, pozitivne samopodobe, samospoštovanja, samostojnosti ter zmanjševanje tesnobe in skrbi. Krepitev samozavesti je del vsake dobre hipnoze, saj je močno orodje pri obravnavi širokega spektra težav. Nekateri avtorji navajajo, da je krepitev samozavesti primerna prav za vse ljudi, ne glede na njihove težave.  Gre za temeljni občutek jaz zmorem, pa naj bo to karkoli."
    }
  ]

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'hypnosis';
    this.currentlyShownElement = this.recordings[0];
  }

  elementClicked(element) {
    //if any other recording was shown close it
    if (this.currentlyShownElement != element && this.currentlyShownElement != null) {
      this.currentlyShownElement.show = false;  
    }
    //show or hide this element
    element.show = !element.show;
    this.currentlyShownElement = element;
  }
}
