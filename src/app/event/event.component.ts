import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(
    private router:         Router,
    private generalService: GeneralService,
    private blogService:    BlogService,
  ) { }

  public arrEvents: Array<any>;

  ngOnInit(){
    this.generalService.currentLink = 'dogodki';
    this.generalService.printCurrentLink();

    this.fetchEvents();
  }

  fetchEvents() {
    // Change for event
    this.blogService.getBlogPosts()
      .subscribe(data => {
        console.log("data blogposts recieved");
        var res = JSON.parse(data.text());
        this.arrEvents = res.blogs;

      }, error => {
        console.log("error blogposts recieved");
        console.log(error);
      })
  }

  redirectToEvent(event){
    console.log(event);
    this.router.navigate(['dogodek/' + event.idvalue]);
  }
}
