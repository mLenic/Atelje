import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

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
  private quotePosition: any;
  public animateText: boolean = false;
  public animateAuthor: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private blogService: BlogService,
    @Inject(DOCUMENT) private document: Document
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

    let bodyRect = document.body.getBoundingClientRect()
    let quote = document.getElementsByClassName("quote-text")[0]
    let quoteRect = quote.getBoundingClientRect()
    this.quotePosition = quoteRect.bottom
    console.log("bodyrect")
    console.log(quoteRect.bottom)
  }

  @HostListener("window:scroll", [])
  
  onWindowScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.outerHeight;

    if (scrollTop > (this.quotePosition - windowHeight + 20)) {
      this.animateAuthor = true;
    }
    if (scrollTop > (this.quotePosition - windowHeight)) {
        this.animateText = true;
    }
    
  }
  scrollToTop()
  {
    this.document.body.scrollTop = 0;
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
