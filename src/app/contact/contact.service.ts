import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

    constructor(private http: Http){}

    sendContactMail(msgJson){

        var url= process.env.herokuAdd || "http://localhost:3000";
        url += "/api/mailing/contact/new";
        
        return this.http
            .post(url, msgJson, {})
            .map((response: Response) => {
                return response.status;
            });
    }

}