import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { GeneralService } from '../../../core/service/general.service';

@Component({
  selector: 'app-recordings-self-confidence',
  templateUrl: '../all-recordings.component.html',
  styleUrls: ['../all-recordings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelfConfidenceComponent implements OnInit {
  recordingTitle: String = 'Samozavest';
  currentlyShownElement = null;
  blockerShown = true;
  popupShown = false;
  recordings: any[] = [
    {
      "title":"Puhast oblak",
      "description":"Kaj če bi lahko vse negativne vzorce, besede, dejanja, ki so razlog za vašo nižjo samozavest, postavili na oblak in opazovali, kako izginjajo? Ob tem pa občutili sončne žarke, ki božajo vaše telo in prijetno toploto sonca.",
      "show": true
    },
    {
      "title": "Varna soba (»nočni posnetek«)",
      "description": "<p>Tehnika je namenjena večanju samospoštovanja. Temelji na občutenju življenjske energije, ki je pomemben del nas, saj lahko zdravi in osrečuje. Odprt konec omogoča, da po hipnotični seansi prijetno zaspite. </p>",
      "show": false
    },
    {
      "title": "Veličastno drevo",
      "description": "To je zelo sproščujoča tehnika. Poudarja zavedanje in občutenje vaših čudovitih lastnosti pa tudi občutek hvaležnosti, za vse to, kar smo.",
      "show": false
    },

  ]
  recordingDescription: any[] = [
    {
      "text": "<p>Ta kategorija zajema tehnike za večanje samozavesti, samozaupanja, pozitivne samopodobe, samospoštovanja, samostojnosti ter zmanjševanje tesnobe in skrbi. Krepitev samozavesti je del vsake dobre hipnoze, saj je močno orodje pri obravnavi najrazličnejših težav. Nekateri avtorji navajajo, da je krepitev samozavesti primerna za vse ljudi, ne glede na njihove težave. Gre za temeljni občutek »jaz zmorem«, pa naj se to nanaša na karkoli.</p><p class='text-margin-top'>Zvočni posnetki se začnejo s sugestijami za globoko sprostitev, ki jim sledijo sugestije za krepitev samozavesti ter vodijo do osredotočanja na temeljne sposobnosti, vrline in pozitivne lastnosti. </p>"
    }
  ]

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'zvocniposnetki';
    this.currentlyShownElement = this.recordings[0];
  }
  displayPopup(){
    console.log("aa");
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

  popUpClick(){
    console.log("aa");
    this.popupShown = true;
  }

  yesClick() {
    this.popupShown = false;
    this.blockerShown = false;
  }
}
