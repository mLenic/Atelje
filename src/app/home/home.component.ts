import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = [
    {
      "title": "Kaj je hipnoza? Kaj je hipnoza",
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
      "subtitle": "V preteklosti me je navdihnila moč hipnoze, ki sem jo imela priložnost spoznati v sklopu izobraževanja za medsti me je navdihnila moč hipnoze, ki sem jo imela priložnost spoznati v sklopu izobraževanja za medicinsko hipnozo pod mentorstvom prof. dr Pajntar Micinsko hipnozo pod mentorstvom prof. dr Pajntar Marjana.",
      "date": "7.12.2017",
      "category": "hipnoza",
      "color": "#8C7BAD"
    }
  ]

  constructor(
    private generalService: GeneralService,
    private blogService: BlogService,
  ) { }

  public homeBlogs: Array<any>;

  ngOnInit() {
    this.generalService.currentLink = 'home';
    this.generalService.printCurrentLink();

    //Fetch all blogs at page load - WIll have to save blogs to session storage - so they won't be loaded every time
    var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    if(jsonBlogs == null){
      this.blogService.getBlogPosts()
                    .subscribe(data => {
                      console.log("data blogposts recieved");
                      var res = JSON.parse(data.text());
                      this.blogService.saveBlogPostsToStorage(res.blogs);
                      this.homeBlogs = res.blogs;
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
    } else {
      this.homeBlogs = jsonBlogs;
    }
    
  }
}
