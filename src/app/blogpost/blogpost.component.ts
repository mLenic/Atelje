import { Component, OnInit } from '@angular/core';
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
    private blogService: BlogService,
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
}
