import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  public arrShownBlogs: Array<any>;

  public searchTerm: string = "";
  public searchCategory = {
    hypnosis: true,
    creative: true,
    personal: true,
    rest: true
  };

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

    this.fetchBlogPosts();
  }  

  /**
   * Search field logic: For searching Media and Formats
   * 
   * 
   * @param term - string Term - that the array is being searched for
   */
  filterBlogs(){
    
    var tmpArray = new Array<any>();  
    console.log(this.searchTerm);
    
    if(this.searchTerm === ""){
      tmpArray = this.arrBlogs;
    } else {
      console.log(tmpArray);
      //Filter for text - searching title and subtitle
      if(this.arrBlogs == null || this.arrBlogs.length > 0){
          this.arrBlogs.forEach(blog => {
              if((blog.title.toLowerCase()).indexOf(this.searchTerm.toLowerCase()) != -1 ||  (blog.subTitle.toLowerCase()).indexOf(this.searchTerm.toLowerCase()) != -1  ){
                  tmpArray.push(blog);
              }
          });
      } 
    }
    
    console.log(tmpArray);
    //TODO: filter for categories

    this.arrShownBlogs = tmpArray;
  }

  //Initially show all blogs
  fetchBlogPosts(){
    var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    if(jsonBlogs == null){
      this.blogService.getBlogPosts()
                    .subscribe(data => {
                      console.log("data blogposts recieved");
                      var res = JSON.parse(data.text());
                      this.blogService.saveBlogPostsToStorage(res.blogs);
                      this.arrBlogs = res.blogs;
                      this.arrShownBlogs = res.blogs;
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
    } else {
      this.arrBlogs = jsonBlogs;
      this.arrShownBlogs = jsonBlogs;
    }

    console.log(this.arrBlogs);
  }
}
