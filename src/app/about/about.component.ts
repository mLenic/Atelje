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
  windowHeight = 0;
  content: any[] = [
    {
      "question": "Kaj je hipnoza?",
      "answer": "<p>Hipnoza je stanje uma. Na kratko jo lahko opredelimo kot postopek, pri katerem hipnoterapevt sugerira hipnotizirani osebi, da doživi spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju.</p><p class='important-text text-margin'>HIPNOZA JE STANJE GLOBOKE SPROŠČENOSTI, USMERJENE POZORNOSTI IN POVEČANE SPREJEMLJIVOSTI ZA SUGESTIJE.</p><p>Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo. To je stanje, ki je zelo podobno sanjarjenju. Je stanje uma, ki ga popolnoma naravno dosežemo večkrat na dan. Spomnimo se vožnje z avtomobilom. Naša pozornost je na cesti, a vendar se zgodi, da se na zavestni ravni ne ukvarjamo z vožnjo. Vse počnemo samodejno, a se kljub temu ustavimo pred rdečo lučjo. Naš um in telo vesta, kako odreagirati. Čeprav so nam omenjeni transi poznani, jih ne prepoznamo kot takšne, čeprav so točno to.</p>",
      "show": true
    },
    {
      "question": "Na katerih področjih lahko uporabljamo hipnozo?",
      "answer": "<p>Do leta 2012 je bilo objavljenih najmanj petsto raziskav o učinkovitosti hipnoze. Rezultati kažejo, da lahko z gotovostjo potrdimo obstoj pozitivnega učinka hipnoze za zdravljenje veliko različnih zdravstvenih in psiholoških težav.</p><p class='text-margin'>Hipnoza je še posebej učinkovita za obravnavo naslednjih področij: </p><p>−	krepitev samozavesti, samospoštovanja, samopodobe;</p><p>−	lajšanje tesnobe, strahov in fobij ter depresivnih stanj;</p><p>−	odvajanje od kajenja, drugih odvisnosti in razvad;</p><p>−	izboljšanje koncentracije ter akademske in športne uspešnosti;</p><p>−	odpravljanje težav v odnosih;</p><p>−	odpravljanje nespečnosti;</p><p>−	obravnavo motnje hranjenja (anoreksija, bulimija, kompulzivno prenajedanje in podobno);</p><p>−	lajšanje psihosomatskih motenj (obravnava simptomov, povzročenih zaradi stresa, alergije, glavobola, migrene, in podobno);</p><p>−	priprava na operacije, anestezijo in obvladovanje bolečin.</p>",
      "show": false
    },
    {
      "question": "Ali je lahko vsaka oseba hipnotizirana?",
      "answer": "<p>Odgovor je preprost, vsaka oseba, ki je zmožna razumeti hipnoterapevtove besede, je zmožna vstopiti v hipnotizirano stanje. Seveda, če v to privoli in je primerno motivirana. </p><p class='text-margin-top'>Ne pozabimo, da govorimo o stanju globoke sproščenosti, usmerjene pozornosti in povečane sprejemljivosti za sugestije. </p>",
      "show": false
    },
    {
      "question": "Kdaj hipnoza ni primerna metoda zdravljenja?",
      "answer": "<p>Hipnoza je primerna za skoraj vse ljudi. Ni primerna za obravnavo psihoz (na primer shizofrenije) in za osebe z epilepsijo. V teh primerih hipnoza ni škodljiva, vsekakor pa ni zadostna za obravnavo resnih psihičnih motenj. Čeprav obstaja vse več dokazov o učinkovitosti hipnoze tudi za tovrstne motnje, je to zunajpodročja mojega dela.</p><p class='text-margin-top'>Moja etična dolžnost in odgovornost je, da v omenjenih primerih ne dajem kakršnihkoli zdravstvenih nasvetov. Z veseljem pa vam svetujem, na koga se lahko obrnete. Če ste v dvomih, me lahko kontaktirate ali pa se posvetujete z vašim osebnim zdravnikom.</p>",
      "show": false
    },
    {
      "question": "Kakšni so stranski učinki?",
      "answer": "<p>Čeprav se hipnoza navadno uporablja za razreševanje neke določene težave, klienti pogosto poročajo o pozitivnih stranskih učinkih, kot so več energije, boljše spopadanje s stresom, predvsem pa zmožnost hitrejše in globlje sprostitve, zaradi česar je boljši tudi naš spanec. </p><p class='text-margin-top'>Hipnoza se lahko uporablja tudi za razreševanje travm in odkrivanje spominov, ki so bili potlačeni. Po tovrstnih terapijah se lahko pojavijo določeni odzivi, kot so zaspanost, vrtoglavica, togost, glavobol ali tesnoba. Vendar omenjeni stranski učinki niso večji kot pri drugih psiholoških metodah, ki ne vključujejo hipnoze. <b>Omenjeni posnetki niso del te spletne strani</b>, saj zahtevajo osebni in strokovni pristop.</p>",
      "show": false
    },
    {
      "question": "Ali se lahko ne zbudim iz hipnotičnega stanja?",
      "answer": "<p>Nobenega dokaza ni, da bi kdorkoli ostal v hipnotiziranem stanju. Vsaka hipnoza je tudi samohipnoza, zato se lahko kadarkoli (tudi med hipnotično seanso) odločite, da boste prenehali slediti mojim besedam ter boste tako izstopili iz hipnotičnega stanja.</p><p class='text-margin-top'>Če med hipnotično seanso zaspite, se boste zbudili povsem naravno. </p>",
      "show": false
    },
    {
      "question": "Kaj pa odrska hipnoza?",
      "answer": "<p>Ločimo med medicinsko (oziroma terapevtsko) in odrsko hipnozo. Slednja je namenjena zabavi, kjer hipnotizer sugerira osebi, da ta počne nekaj nenavadnega in s tem zabava občinstvo. Vse poteka dramatično; uspešnost te je odvisna od karizmatičnosti voditeljain njegove avtoritete. V nasprotju s hipnoterapijo, pri kateri je uspešnost te odvisna predvsem od odnosa med terapevtom in klientom. Med hipnozo vedno počnemo ali povemo le stvari, ki so v skladu z našimi prepričanji in vrednotami ter jih želimo tudi deliti.</p>",
      "show": false
    },
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
    this.currentlyShownElement = this.content[0];
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

  aboutHypnosisClicked(el) {
    //Scroll to bottom
    el.scrollIntoView();
  }

}
