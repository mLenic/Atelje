import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private blogService: BlogService,
  ) { }

  public arrBlogs: Array<any>;

  posts: any[] = [
    {
      "title": "Kaj je hipnoza?",
      "subtitle": "Hipnoza je vsakdanji psihološki pojav, pri katerem hipnotizer Hipnoza je vsakdanji psihološki pojav, pri katerem hipnotizer sugerira Hipnoza je vsakdanji psihološki pojav, pri katerem hipnotizer sugerira Hipnoza je vsakdanji psihološki pojav, pri katerem hipnotizer sugerira Hipnoza je vsakdanji psihološki pojav, pri katerem hipnotizer sugerira sugerira hipnotizirani osebi, da bo doživela spremembe v občutenju, zaznavanju, čustvovanju, mišljenju in vedenju 6.",
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

  fetchBlogPosts(){
    var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    if(jsonBlogs == null){
      this.blogService.getBlogPosts()
                    .subscribe(data => {
                      console.log("data blogposts recieved");
                      var res = JSON.parse(data.text());
                      this.blogService.saveBlogPostsToStorage(res.blogs);
                      this.arrBlogs = res.blogs;
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
    } else {
      this.arrBlogs = jsonBlogs;
    }
  }
}
