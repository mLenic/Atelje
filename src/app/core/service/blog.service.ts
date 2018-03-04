import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class BlogService {

    private _blogPosts: Array<any> = new Array<any>();
    public uriBase;

    constructor (
        private http: Http,
    ) { 
        console.log("Making blog service");

        //TODO: Change for production
        this.uriBase = 'http://localhost:3000';
    }

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

    public getSignedRequest(file){
        const fileName = encodeURIComponent(file.name);
        const fileType = file.type; 

        var fileSignatureUri = this.uriBase + '/api/sign-s3?file-name=' + fileName + '&file-type=' + fileType;

        return this.http
                .get(fileSignatureUri, {})
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


}
