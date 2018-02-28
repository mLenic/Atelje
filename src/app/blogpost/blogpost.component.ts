import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  public currentBlog: any = null;

  constructor(
    private generalService: GeneralService,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.generalService.currentLink = 'blogpost';
    this.currentBlog = this.blogService.blogPosts;
    console.log(this.currentBlog);
  }

}
