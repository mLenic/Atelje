import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private generalService: GeneralService,
    private blogService: BlogService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.generalService.currentLink = 'blogpost';
    
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

    var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    
    if(jsonBlogs != null){
      jsonBlogs.forEach(blog => {
        if(blog.idvalue == this._routeId){
          this.currentBlog = blog;
        }
      });
    }
    
    if(this.currentBlog != null){
      console.log("Blog found in sessionStorage");
      console.log(this.currentBlog);
      return;
    }

    console.log("Blog not found in session storage, fetch it from database");
    this.blogService.getBlogPost(this._routeId)
          .subscribe((data) => {
            console.log("Got blog post data");
            var res = JSON.parse(data.text());
            this.currentBlog = res.blog;
            console.log(this.currentBlog);
            //once firt blogpost is successfully received, fetch all blogs so that user has them saved in sessionstorage
            this.fetchBlogPosts();
          }, (error) => {
            console.log("Error getting blog post data");
            console.log(error);
            this.router.navigate(['/blog']);
          });
  }
  
  fetchBlogPosts(){
    //Fetching all blogs from db
    this.blogService.getBlogPosts()
      .subscribe(data => {
        console.log("data blogposts recieved - saving to localstorage");
        var res = JSON.parse(data.text());
        this.blogService.saveBlogPostsToStorage(res.blogs);
      }, error => {
        console.log("error blogposts recieved");
        console.log(error);
      })
  }
  

  loadNextBlogPost(previous: boolean) {
    //Blogs should be saved in sessionStorage and ordered by Date (API sends data back sorted)
    var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    var currIdx = -1;
    
    for(var i = 0; i < jsonBlogs.length; i++){
      if(Number(this._routeId) === Number(jsonBlogs[i].idvalue)){
        currIdx = i;
      }
    }
    var idUrl = null;
    
    if(previous){
      
      if(currIdx == jsonBlogs.length -1){
        idUrl = jsonBlogs[0].idvalue;
      } else {
        idUrl = jsonBlogs[currIdx+1].idvalue;
      }
    } else{
      
      if(currIdx == 0){
        idUrl = jsonBlogs[jsonBlogs.length-1].idvalue;
      } else {
        idUrl = jsonBlogs[currIdx-1].idvalue;
      }
    }
    
    this.router.navigate(['/blogpost/' + idUrl]);
  }
}
