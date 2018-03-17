import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../../core/service/general.service';

@Component({
  selector: 'app-recordings-me',
  templateUrl: '../all-recordings.component.html',
  styleUrls: ['../all-recordings.component.scss']
})

export class MeComponent implements OnInit {
  recordingTitle: String = 'Jaz';
  currentlyShownElement = null;
  recordings: any[] = [
    {
      "title": "Kamenčki za spremembe",
      "description": "<p>To je ena od mojih najljubših tehnik. Popelje vas v čarobno naravo, kjer si lahko izberete kamenčke, ki predstavljajo spremembe v vašem življenju. Poleg tega se lahko znebite tistega, česar ne potrebujete več v vašem življenju, kot so razvade, negativne misli, hrepenenja, občutki... </p>",
      "show": true
    },
    {
      "title": "Rdeč balon",
      "description": "<p>Predstavljajte si, da bi lahko vse negativne in neprijetne občutke zložili v nahrbtnik ter ga odnesli na vrh gore. Predstavljajte si, da bi še zadnjič začutili vso težo teh občutkov, s pomočjo rdečega balona pa bi jim dovolili, da za vedno izginejo. Predstavljajte si to neskončno lahkotnost, srečo in svobodo, ki jih občutite, ko teh občutkov ni več. </p>",
      "show": false
    },
    {
      "title": "Kraj vedrine",
      "description": "<p>Tehnika vas popelje na varen kraj po vaši izbiri. Na kraj, kjer boste pridobili novo energijo, uživali v občutkih sproščenosti, spokojnosti, miru in sreče... Vse to bo postalo del vas.</p>",
      "show": false
    }
  ]
  recordingDescription: any[] = [
    {
      "text": "<p>Zvočni posnetki v tej kategoriji vam ponujajo priložnost za sprostitev, premagovanje tesnobe, opustitev slabih navad in prepričanj, predvsem pa za doseganje sprememb v življenju. Namenjeni so spoznavanju vaših doslej neodkritih in skritih potencialov. Morda pa vam pomagajo tudi pri uresničitvi vaših želja. </p>"
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
