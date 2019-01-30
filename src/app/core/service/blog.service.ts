import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';

import { Globals } from '../../../../globals';

// Service for blogs and events
@Injectable()
export class BlogService {

    private _blogPosts: Array<any> = new Array<any>();
    public uriBase;

    constructor (
        private http: Http,
        private globals: Globals,
    ) {
        console.log("Making blog service");

        //TODO: Change for production
        this.uriBase =  this.globals.HTTP_GLOBAL_ADDRESS || 'http://localhost:3000';
    }
    /***** EVENTS *****/
    public saveEvent(json){
        var uri = this.uriBase + "/api/event/new";

        return this.http
            .post(uri, json, {})
            .map((response: Response) => {
                return response.status;
            });
    }

    public getEvents(){
        var eventApiUri = this.uriBase + '/api/event';
        return this.http
            .get(eventApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }

    public getEvent(id: number){
        var eventApiUri = this.uriBase + '/api/event/' + id;
        return this.http
            .get(eventApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }
    /***** BLOGS *****/
    public saveBlogPost(json){
        var uri = this.uriBase + "/api/blogposts/new";

        return this.http
            .post(uri, json, {})
            .map((response: Response) => {
                return response.status;
            });
    }

    public getBlogPosts(){
        var blogApiUri = this.uriBase + '/api/blogposts';
        return this.http
            .get(blogApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }

    public getBlogPost(id: number){
        var blogPostApiUri = this.uriBase + '/api/blogpost/' + id;
        return this.http
            .get(blogPostApiUri, {})
            .map((response: Response) => {
                return response;
            });
    }

    public getSignedRequest(file, json){
        const fileName = encodeURIComponent(file.name);
        const fileType = file.type;

        var fileSignatureUri = this.uriBase + '/api/sign-s3?file-name=' + fileName + '&file-type=' + fileType;

        return this.http
                .post(fileSignatureUri, json, {})
                .map((response: Response) => {
                    return response;
                });

    }

    uploadPicture(file: File, signedRequest, url){
        return this.http
                    .put(signedRequest, file, {})
                    .map((response: Response) => {
                        return response;
                    })
    }

    get blogPosts(): Array<any> {
        return this._blogPosts;
    }

    set blogPosts(blogposts: Array<any>){
        this._blogPosts = blogposts;
    }

    /**
     * Localstorage items
     */

     saveBlogPostsToStorage(blogs){
        var strBlogs = JSON.stringify(blogs);
        sessionStorage.setItem("blogs", strBlogs);
     }

     getBlogPostsFromStorage(){
         var strBlogs = sessionStorage.getItem("blogs");
         var jsonBlogs = null;

         if(strBlogs != null){
             console.log("should return blog");
             jsonBlogs = JSON.parse(strBlogs);
             return jsonBlogs;
         } else {
             console.log("Blogs aren't here, load them anew!")
             return jsonBlogs
         }
     }
}
