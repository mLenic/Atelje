import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  public  currentBlog: any = null;
  private _routeId: number = null;


  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.generalService.currentLink = 'blogpost';
    this.currentBlog = this.blogService.blogPosts;
    console.log(this.currentBlog);

    this.route.params.subscribe(params => {
      this._routeId = params['id'];
      if(this._routeId == null){
        //What to do in error situation?
        console.log("Error in route");
      } else {
        this.fetchBlogpost();
      }
    });
    console.log("Testing if service is singleton");
    console.log(this.blogService.blogPosts);
    //Fetch blog based on ID from URL
    
  }

  fetchBlogpost(){
    this.blogService.getBlogPost(this._routeId)
          .subscribe((data) => {
            console.log("Got blog post data");
            var res = JSON.parse(data.text());
            console.log(res.blog);
          }, (error) => {
            console.log("Error getting blog post data");
            console.log(error);
          });
  }

}
