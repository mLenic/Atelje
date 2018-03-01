import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class BlogService {

    private _blogPosts: Array<any> = new Array<any>();

    constructor (
        private http: Http,
    ) { 
        console.log("Making blog service");
    }

    public getBlogPosts(){
        var blogApiUri = 'http://localhost:3000/api/blogposts';
        return this.http
            .get(blogApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }

    public getBlogPost(id: number){
        var blogPostApiUri = 'http://localhost:3000/api/blogpost/' + id;
        return this.http
            .get(blogPostApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }

    get blogPosts(): Array<any> {
        return this._blogPosts;
    }

    set blogPosts(blogposts: Array<any>){
        this._blogPosts = blogposts;
    }
}