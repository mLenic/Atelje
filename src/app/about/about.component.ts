import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { GeneralService } from '../core/service/general.service';

declare var SC: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  currentlyShownElement = null;
  fixedSubNav: boolean = false;
  windowHeight = 0;
  about: any[] = [
    {
      "question": "Kaj je hipnoza?",
      "answer": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "show": false
    },
    {
      "question": "Na katerih področjih lahko uporabljamo hipnozo?",
      "answer": "- Krepitev ega (krepitev samozavesti, samospoštovanja, samopodobe..)	\n- tesnoba, strahovi in fobije \n- kajenje, odvisnosti in razvade \n- koncentracija in akademska uspešnost \n- športna uspešnost \n- depresivna stanja \n- nespečnost \n- težave z debelostjo",
      "show": false
    },
    {
      "question": "Ali je hipnoza primerna za vse?",
      "answer": "Hipnoza je primerna za skoraj vse. Ni primerna za obravnavo psihoz (npr. shizofrenije). V teh primerih hipnoza ni škodljiva, vsekakor pa ni zadostna za obravnavo resnih psihičnih motenj. Kljub temu da osbtaja vedno več dokazov o učikovitosti hipnoze tudi za tovstne motnje, je le to izven obsega mojih zvočnih posnetkov. Hipnoza prav tako ni primerna za osebe z epilepsijo. \nMoja etična dolžnost  in odgovornost je, da v tovrstnih primerih ne dajem kakršnihkoli zdravstvenih nasvetov. V kolikor ste v dvomih glede poslušanja hipnoze, se prosim, posvetujte z vašim osebnim zdravnikom.",
      "show": false
    },
    {
      "question": "Ali je vsaka oseba lahko hipnotizirana?",
      "answer": "Odgovor je preprost: JA. Vsaka oseba, ki je zmožna razumeti hipnoterapevtove besede je zmožna vstopiti v hipnotizirano stanje. Seveda, če oseba v to privoli in je primerno motivirana.",
      "show": false
    },
    {
      "question": "Kakšni so stranski učinki?",
      "answer": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "show": false
    },
    {
      "question": "Ali je obisk hipnoterapevta bolj koristen kot poslušanje zvočnih posnetkov?",
      "answer": "Moji zvočni posnetki so učinkovito orodje, ki vam s pomočjo vaše podzavesti pomagajo, da dosežete kar želite. Kljub temu pa je hipnoterapija veliko bolj učinkovita kadar je individualizirana. Upoštevati je potrebno edinstvene motivacije, osebnost, zanimanja in klinentova nagnjenja. Le tako lahko terapevt prilagodi sugestije in metafore.  Za več inforformacij, mi lahko pišete (kontakt).",
      "show": false
    }
  ];

  constructor(@Inject(DOCUMENT) private document: Document, private generalService: GeneralService) { }

  elementClicked(element) {
    //if any other question was shown close it
    if (this.currentlyShownElement != element && this.currentlyShownElement != null) {
      this.currentlyShownElement.show = false;  
    }
    //show or hide this element
    element.show = !element.show;
    this.currentlyShownElement = element;
  }

  ngOnInit() {
    this.windowHeight = window.innerHeight;

    this.generalService.currentLink = 'hypnosis';
    this.generalService.currentHypnosisSublink = 'about-hypnosis';
    this.generalService.printCurrentLink();
  }

  @HostListener("window:scroll", [])
  
  onWindowScroll() {
    
    const scrollTop = window.scrollY;
    const windowHeight = window.outerHeight;
    console.log(scrollTop);
    /*
    if(scrollTop > (this.windowHeight - 100)) //nav-height = 100px
    {
        console.log("oi");
        this.fixedSubNav = true;
        console.log(this.fixedSubNav);
    }
    else {
        this.fixedSubNav = false;
        console.log(this.fixedSubNav);
    }
    */
  }
  scrollToTop()
  {
    this.document.body.scrollTop = 0;
  }

}
