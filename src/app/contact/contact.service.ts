import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

    constructor(private http: Http){}

    sendContactMail(msgJson){

        var url="http://localhost:3000/api/mailing/contact/new"
        
        return this.http
            .post(url, msgJson, {})
            .map((response: Response) => {
                return response.status;
            });
    }

}