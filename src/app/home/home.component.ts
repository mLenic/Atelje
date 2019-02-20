import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:         Router,
    public  generalService: GeneralService,
    private blogService:    BlogService,
  ) { }

  public homeBlogs: Array<any> = new Array<any>();
  public arrEvents: Array<any> = new Array<any>();

  public months = ["JANUAR", "FEBRUAR", "MAREC", "APRIL", "MAJ", "JUNIJ", "JULIJ", "AVGUST", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER" ];

  ngOnInit() {
    this.generalService.currentLink = 'home';
    this.generalService.printCurrentLink();

    //Fetch all blogs at page load - WIll have to save blogs to session storage - so they won't be loaded every time
    //Commented due to cookie use - Should it be here?
    //var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    var jsonBlogs = null;
    if(jsonBlogs == null){
      this.blogService.getBlogPosts()
                    .subscribe(data => {
                      var res = JSON.parse(data.text());
                      //this.blogService.saveBlogPostsToStorage(res.blogs);
                      this.homeBlogs = res.blogs;
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
    } else {
      this.homeBlogs = jsonBlogs;
    }

    this.fetchEvents();
  }

  fetchEvents() {
    // Change for event
    this.blogService.getEvents()
      .subscribe(data => {
        var res = JSON.parse(data.text());
        console.log(res);
        this.arrEvents = res.events;
      }, error => {
        console.log(error);
      })
  }

  redirectToBlogPost(blog){
    console.log(blog);
    this.router.navigate(['blog/' + blog.idvalue]);
  }

  redirectToEvent(event){
    this.router.navigate(['dogodek/' + event.idvalue]);
  }

  getEventDay(event) {
    var dt = new Date(event.dateEvent);
    return dt.getDate();
  }

  getEventMonth(event) {
    var dt = new Date(event.dateEvent);
    return this.months[dt.getMonth()];
  }
}
