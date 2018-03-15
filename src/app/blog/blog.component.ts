import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  posts: any[] = [
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "V preteklosti me je navdihnila moč hipnoze, ki sem jo imela priložnost spoznati v sklopu izobraževanja za medicinsko hipnozo pod mentorstvom prof. dr Pajntar Marjana.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "V preteklosti me je navdihnila moč hipnoze, ki sem jo imela priložnost spoznati v sklopu izobraževanja za medicinsko hipnozo pod mentorstvom prof. dr Pajntar Marjana.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "V preteklosti me je navdihnila moč hipnoze, ki sem jo imela priložnost spoznati v sklopu izobraževanja za medicinsko hipnozo pod mentorstvom prof. dr Pajntar Marjana.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza in kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza in kaj in zakaj je hipnoza?",
      "subtitle": "Hipnozah som niti ne poimenujemo1oza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza in kaj in zakaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza in kaj in zakaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    },
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, ki se pojavlja v mnogih življenjskih situacijah1,2, a ga ne prepoznamo kot hipnozo in ga s tem imenom niti ne poimenujemo1,3. Enotno mnenje, kaj hipnoza je, še ne obstaja3,4,5.Kljub temu pa lahko hipnozo na kratko opredelimo kot postopek, pri katerem hipnotizer sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    }
  ];

  ngOnInit() {
    this.generalService.currentLink = 'blog';
    this.generalService.printCurrentLink();
  }

}
