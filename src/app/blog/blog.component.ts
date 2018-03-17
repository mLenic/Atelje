import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GeneralService } from '../core/service/general.service';
import { BlogService } from '../core/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private router:         Router,
    private generalService: GeneralService,
    private blogService:    BlogService,
  ) { }

  public arrBlogs: Array<any>;
  public arrShownBlogs: Array<any>;

  public searchTerm: string = "";
  public searchCategory = {
    hypnosis: true,
    creative: true,
    personal: true,
    rest: true
  };

  ngOnInit() {
    this.generalService.currentLink = 'blog';
    this.generalService.printCurrentLink();

    this.fetchBlogPosts();
  }  

  /**
   * Search field logic: For searching Media and Formats
   * 
   * 
   * @param term - string Term - that the array is being searched for
   */
  filterBlogs(){
    
    var tmpArray = new Array<any>();  
    console.log(this.searchTerm);
    debugger;
    if(this.searchTerm === ""){
      
      for(let i = 0; i < this.arrBlogs.length; i++){
          //Filter for categories  
          if(this.searchCategory.hypnosis == false && this.arrBlogs[i].category == "hypnosis") continue;
          if(this.searchCategory.creative == false && this.arrBlogs[i].category == "creative") continue;
          if(this.searchCategory.personal == false && this.arrBlogs[i].category == "personal") continue;
          if(this.searchCategory.rest     == false && this.arrBlogs[i].category == "rest"    ) continue;
          tmpArray.push(this.arrBlogs[i]);
    
      }
    } else {
      console.log(tmpArray);
      //Filter for text and categories - searching title and description
      
      if(this.arrBlogs == null || this.arrBlogs.length > 0){
          for(let i = 0; i < this.arrBlogs.length; i++){
            if((this.arrBlogs[i].title.toLowerCase()).indexOf(this.searchTerm.toLowerCase()) != -1 ||  (this.arrBlogs[i].description.toLowerCase()).indexOf(this.searchTerm.toLowerCase()) != -1  ){
              //Filter for categories  
              if(this.searchCategory.hypnosis == false && this.arrBlogs[i].category == "hypnosis") continue;
              if(this.searchCategory.creative == false && this.arrBlogs[i].category == "creative") continue;
              if(this.searchCategory.personal == false && this.arrBlogs[i].category == "personal") continue;
              if(this.searchCategory.rest     == false && this.arrBlogs[i].category == "rest"    ) continue;
              tmpArray.push(this.arrBlogs[i]);
            }
          }
      } 
    }
    
    console.log(tmpArray);
    this.arrShownBlogs = tmpArray;
  }

  //Initially show all blogs
  fetchBlogPosts(){
    //var jsonBlogs = this.blogService.getBlogPostsFromStorage();
    var jsonBlogs = null;
    if(jsonBlogs == null){
      this.blogService.getBlogPosts()
                    .subscribe(data => {
                      console.log("data blogposts recieved");
                      var res = JSON.parse(data.text());
                      //this.blogService.saveBlogPostsToStorage(res.blogs);
                      this.arrBlogs = res.blogs;
                      this.arrShownBlogs = res.blogs;
                    }, error => {
                      console.log("error blogposts recieved");
                      console.log(error);
                    })
    } else {
      this.arrBlogs = jsonBlogs;
      this.arrShownBlogs = jsonBlogs;
    }
  }

  redirectToBlogPost(blog){
    console.log(blog);
    debugger;
    this.router.navigate(['blog/' + blog.idvalue]);
  }
}
