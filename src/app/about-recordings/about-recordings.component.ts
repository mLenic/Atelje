import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-about-recordings',
  templateUrl: './about-recordings.component.html',
  styleUrls: ['./about-recordings.component.scss']
})
export class AboutRecordingsComponent implements OnInit {

  content: any[] = [
    {
      "question": "Kako varno je poslušanje zvočnih posnetkov?",
      "answer": "<p>Hipnoza je naravni fenomen in je kot taka popolnoma varna.</p><p class='text-margin-top'>Če bo med hipnozo izrečeno nekaj, kar ni v skladu z vašimi vrednotami in prepričanji, bo vaš podzavestni um to preprosto preslišal.</p><p class='text-margin-top'>Sama rada rečem, da gre le za to, da se spomnimo, kar že vemo in kar nam pomaga oblikovati novo perspektivo ter pike povezati v celoto. Prav zato sem v posnetke vključila veliko metafor, ki si jih vsak lahko razlaga po svoje in na način, ki ga potrebuje. Z drugimi besedami, v posnetkih podam veliko različnih sugestij in metafor. Več kot jih je, večje so možnosti, da bodo nekatere tudi sprejete.</p>",
      "show": true
    },
    {
      "question": "Kako dolgi so zvočni posnetki?",
      "answer": "<p>Posnetki so dolgi od 15 do 25 minut. Po mojih izkušnjah je to optimalen čas za tovrstne posnetke. Pri daljših posnetkih se poveča možnost, da zaspite ali izgubite koncentracijo. Poleg tega pa je omenjeni časovni okvir podprt tudi z razumevanjem naravnega ultradialnega ritma našega telesa. Ultradialen ritem uravnava našo pozornost in energijo. Vsakemu 90- do 120-minutnemu intervalu aktivnega mišljenja sledi 20-minutni interval, ko se pojavita utrujenost in nezbranost. Omenjeni 20-minutni vmesni intervali so zelo dobra priložnost za hipnozo. Po 20 minutah so naši možgani spet pripravljeni na bolj logične in analitične miselne procese. To je razlog, da po 25 minutah poslušanja hipnotične seanse morda želite prenehati s hipnozo, vstati in početi kaj drugega.</p>",
      "show": false
    },
    {
      "question": "Kako pogosto poslušati zvočne posnetke?",
      "answer": "<p>Najbolje je, da prvih nekaj tednov posnetke poslušate enkrat na dan. Pomembno je, da jih poslušate redno, saj je to ključno za doseganje želenega rezultata. Naslednji mesec jih lahko poslušate vsak drugi ali tretji dan. Po tem jih lahko poslušate po želji ali potrebi.</p><p class='text-margin-top'>Čeprav smo v hipnotiziranem (alfa) stanju 200-krat bolj dovzetni za sugestije kot v budnem (beta) stanju, je zelo pomembno redno poslušanje ključ do uspeha.</p>",
      "show": false
    },
    {
      "question": "Lahko posnetke poslušam več kot enkrat na dan?",
      "answer": "<p>Posnetke lahko poslušate dvakrat na dan, ampak to ne pomeni, da bo rezultat tudi dvakrat boljši. Bolje je, da v enem dnevu poslušate dva različna posnetka kot istega dvakrat. Priporočam, da ne poslušate enega za drugim, naj bo vmes vsaj eno uro premora.</p>",
      "show": false
    },
    {
      "question": "Kdaj in kako poslušati posnetke? ",
      "answer": "<p>Poslušate jih lahko, kadarkoli in kjerkoli se počutite varno in udobno. Pomembno je, da jih ne poslušate med vožnjo ali takrat, ko morate biti zbrani. Lahko jih poslušate prek slušalk ali brez njih.</p>",
      "show": false
    },
    {
      "question": "Kaj se zgodi, če med poslušanjem zaspim?",
      "answer": "<p>Za učinek hipnoterapije je bolje, da med poslušanjem ne zaspite. Naš podzavestni um nikoli ne spi, in poslušanje bo v vsakem primeru imelo pozitiven učinek. </p>",
      "show": false
    },
    {
      "question": "Kaj pomeni »nočni posnetek«?",
      "answer": "<p>Tehnike, označene z »nočni posnetek«, so namenjene poslušanju tik pred spanjem. Od drugihdnevnih tehnik se razlikujejo po daljšem in še bolj sproščujočem uvajanju in poglabljanju v hipnotično stanje. Poleg tega imajo odprt konec, ki spodbuja, da po hipnotični seansi lažje zaspite.</p><p class='text-margin-top'>Večina hipnotičnih seans ima na koncu posnetka zbujanje iz hipnotičnega stanja. Če želite po hipnozi (ki ni označena kot »nočni posnetek«) zaspati, preprosto prej ustavite posnetek. Po poslušanju boste zelo umirjeni in sproščeni.Tako boste lažje zaspali.</p>",
      "show": false
    },
    {
      "question": "Ali je obisk hipnoterapevta učinkovitejši kot poslušanje zvočnih posnetkov?",
      "answer": "<p>Zvočni posnetki so učinkovito orodje, ki vam s pomočjo vaše podzavesti pomagajo, da dosežete, kar želite. Kljub temu pa je hipnoterapija veliko bolj učinkovita, kadar je prilagojena posamezniku. Upoštevati je treba edinstvene motivacije, osebnost, zanimanja in klientova nagnjenja,saj bo le tako lahko terapevt prilagodil sugestije in metafore. Več si lahko preberete <a href='/hipnoterapija'><span class='text-link'>tukaj</span></a>.</p>",
      "show": false
    }
  ];

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'hypnosis';
    this.generalService.currentHypnosisSublink = 'about-recordings';
  }

}
