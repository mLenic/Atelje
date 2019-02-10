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
  public months = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ];

  ngOnInit(){
    this.generalService.currentLink = 'dogodki';
    this.generalService.printCurrentLink();

    this.fetchEvents();
  }

  fetchEvents() {
    // Change for event
    this.blogService.getEvents()
      .subscribe(data => {
        console.log("data blogposts recieved");
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

  datePipe(event){
    //Created custom - tolocaledateString not really supported in all browser
    var fSPlt = event.dateEvent.split("T");
    var lSplt = fSPlt[0].split("-");

    const mnth = this.months[(Number)(lSplt[1]) - 1];

    return lSplt[2] + '. ' + mnth + ' ' + lSplt[0];

  }
}
