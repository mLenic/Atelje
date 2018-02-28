import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class BlogService {

    private _blogPosts: Array<any> = new Array<any>();

    constructor (
        private http: Http,
    ) { }

    public getBlogPosts(){
        var blogApiUri = 'localhost:3000/api/blogposts';
        return this.http
            .get(blogApiUri, {})
            .map((response: Response) => {
                console.log("Response from server");
                this._blogPosts = ["BLOG"];
                return response;
            });
    }

    public getBlogPost(id: number){
        var blogPostApiUri = '/api/blogpost/' + id;
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