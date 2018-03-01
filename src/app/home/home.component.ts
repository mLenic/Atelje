import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.generalService.currentLink = 'home';
    this.generalService.printCurrentLink();

    //Fetch all blogs at page load - WIll have to save blogs to session storage - so they won't be loaded every time
    this.blogService.getBlogPosts()
                    .subscribe(data => {
                      console.log("data blogposts recieved");
                      console.log(data);
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
  }
}
