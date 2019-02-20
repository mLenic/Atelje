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
  public months = ["JANUAR", "FEBRUAR", "MAREC", "APRIL", "MAJ", "JUNIJ", "JULIJ", "AVGUST", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER" ];

  ngOnInit(){
    this.generalService.currentLink = 'dogodki';
    this.generalService.printCurrentLink();

    this.fetchEvents();
  }

  fetchEvents() {
    // Change for event
    this.blogService.getEvents()
      .subscribe(data => {
        console.log("data events recieved");
        var res = JSON.parse(data.text());
        console.log(res);
        this.arrEvents = res.events;

      }, error => {
        console.log("error blogposts recieved");
        console.log(error);
      })
  }

  redirectToEvent(event){
    console.log(event);
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
