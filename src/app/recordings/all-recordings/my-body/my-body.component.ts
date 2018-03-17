import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../../../core/service/general.service';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-recordings-my-body',
  templateUrl: '../all-recordings.component.html',
  styleUrls: ['../all-recordings.component.scss']
})

export class MyBodyComponent implements OnInit {
  recordingTitle: String = 'Moje telo';
  currentlyShownElement = null;
  blockerShown = true;
  popupShown = false;
  recordings: any[] = [
    {
      "title": "Prehranjevanje je umetnost",
      "description": "<p>Tehnika se začne s sugestijami za sproščanje in pozitivnimi sugestijami za dobro počutje. Prehranjevanje je predstavljeno kot umetnost, ki spodbuja uživanje v hrani s preprostimi tehnikami, kot sta opazovanje barv in tekstur ter zaznavanje vonja, arom in okusa.</p><p class='text-margin-top'>Za zmanjševanje hrepenenj lahko uporabite tudi tehniko rdečega balona.</p>",
      "show": true
    },
    {
      "title": "Brez hrepenenj",
      "description": "<p>V tej hipnotični seansi so podane sugestije za zmanjševanje in obvladovanje hrepenenj. Kaj pa, če se hrepenenje ne pojavlja le zaradi fizičnega pomanjkanja? Kako to obrniti sebi v korist? </p>",
      "show": false
    },
    {
      "title": "Grajska pot",
      "description": "<p>Vabljeni na čudovito potovanje, ki se začne in konča na isti točki. Kaj pa vmes? Občutili boste prav posebne občutke. Počutili se boste resnično dobro, udobno in povsem sproščeno. Omenjeni občutki bodo prevzeli vaše telo in dušo. To pa vam bo pomagalo prevzeti nadzor nad prehranjevanjem. Pridobili boste moč in motivacijo za doseganje želenega rezultata. </p>",
      "show": false
    }
  ]
  recordingDescription: any[] = [
    {
      "text": "<p>Sugestije v tej kategoriji spodbujajo tako zdrav slog življenja kot tudi nadzor nad telesno težo in prehranjevanjem. Glavni namen je preoblikovati odnos do hrane, in sicer s poudarkom na zdravem načinu prehranjevanja. </p><p class='text-margin-top'>Za doseganje najboljšega rezultata svetujem poslušanje v kombinaciji s sugestijami za <a href='/zvocniposnetki/samozavest'><span class='text-link'>krepitev samozavesti.</span></a></p>"
    }
  ]

  constructor(
    private generalService: GeneralService,
    private sanitizer:      DomSanitizer,) { }

  ngOnInit() {
    this.generalService.currentLink = 'hypnosis';
    this.currentlyShownElement = this.recordings[0];
  }
  
  sanitizedUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getUrl(html){
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  popUpClick(){
    console.log("aa");
    this.popupShown = true;
  }

  yesClick() {
    this.popupShown = false;
    this.blockerShown = false;
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
