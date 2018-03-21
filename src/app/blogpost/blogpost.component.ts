import { Component, OnInit, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogpostComponent implements OnInit {

  public  currentBlog: any = null;
  public _routeId: number = null;
  private quotePosition: any = null;
  public animateText: boolean = false;
  public animateAuthor: boolean = false;

  private nextBlogpostId:     number = null;
  private previousBlogpostId: number = null;

  public months = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ];

  constructor(
    private route:          ActivatedRoute,
    private router:         Router,
    private generalService: GeneralService,
    private blogService:    BlogService,
    private sanitizer:      DomSanitizer,
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
    
  }

  getHidden(previous){
    if(previous && this.previousBlogpostId != null){
      return true;
    }
    if(!previous && this.nextBlogpostId != null){
      return true;
    }

    return false;
  }

  get currentBlogTest(){
    return this.sanitizer.bypassSecurityTrustHtml(this.currentBlog.content);
  }

  /* initQuoteAnimation(){
    setTimeout(() => {
      console.log("Initiated ssss");
      let bodyRect = document.body.getBoundingClientRect();
      let quote = document.getElementsByClassName("quote-text")[0];
      let quoteRect = quote.getBoundingClientRect();
      this.quotePosition = quoteRect.bottom;
      console.log("bodyrect");
      console.log(quoteRect.bottom);
    }, 500);
  } */

/*   @HostListener("window:scroll", [])
  
  onWindowScroll() {
    console.log("Called on window ")
    const scrollTop = window.scrollY;
    const windowHeight = window.outerHeight;
    if(this.quotePosition != null){
      if (scrollTop > (this.quotePosition - windowHeight + 20)) {
        this.animateAuthor = true;
      }
      if (scrollTop > (this.quotePosition - windowHeight)) {
          this.animateText = true;
      }
    }
    console.log("animate author" + this.animateAuthor);
    console.log("animate text" + this.animateText);
    
    
  }
  scrollToTop()
  {
    this.document.body.scrollTop = 0;
  }
     */
  

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
      //this.initQuoteAnimation();
      return;
    }

    console.log("Blog not found in session storage, fetch it from database");
    this.blogService.getBlogPost(this._routeId)
          .subscribe((data) => {
            console.log("Got blog post data");
            var res = JSON.parse(data.text());
            var found = false;
            
            res.blog.forEach(blog => {
              if(blog.idvalue == this._routeId){
                this.currentBlog = blog;  
                found = true;
              }
              
            });

            res.blog.forEach(blog => {
                if(blog.idvalue == this.currentBlog.idvalue-1){
                  this.previousBlogpostId = blog.idvalue;
                }
                if(blog.idvalue == this.currentBlog.idvalue+1){
                  this.nextBlogpostId = blog.idvalue;
                }
            });
            if(!found){
              this.router.navigate(['/blog']);
            }
            console.log(this.currentBlog);
            //once firt blogpost is successfully received, fetch all blogs so that user has them saved in sessionstorage - Disable session storage for now
            //this.fetchBlogPosts();

            //this.initQuoteAnimation();
          }, (error) => {
            console.log("Error getting blog post data");
            console.log(error);
            this.router.navigate(['/blog']);
          });
  }
  
  getBlogCategory(){
    
    if(this.currentBlog.category == "hypnosis"){
      return "Zapisi o hipnozi";
    } else if(this.currentBlog.category == "creative"){
      return "Kreativne terapevtske tehnike";
    } else if(this.currentBlog.category == "personal"){
      return "Moja razmišljanja";
    } else if(this.currentBlog.category == "rest"){
      return "Ostali navdihi"
    } 
  }

  datePipe(){
    //Created custom - tolocaledateString not really supported in all browser
    var fSPlt = this.currentBlog.datePosted.split("T");
    var lSplt = fSPlt[0].split("-");
    
    const mnth = this.months[(Number)(lSplt[1]) - 1];

    return lSplt[2] + '. ' + mnth + ' ' + lSplt[0];

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
    /* console.log("aaa");
    debugger;
    if(previous && this.previousBlogpostId != null){
      this.router.navigate(['/blog/' + this.previousBlogpostId]);
      
    } else if (!previous && this.nextBlogpostId != null) {
      this.router.navigate(['/blog/' + this.nextBlogpostId]);
      
    } */
    
  }

  reloadComponent(id){
    this._routeId = id;
    this.fetchBlogpost();
  }
}
