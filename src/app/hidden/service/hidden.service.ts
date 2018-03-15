import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Globals } from '../../../../globals';

@Injectable()
export class HiddenService {

    constructor(
        private http: Http,
        private globals: Globals,
    ){}

    sendContactMail(msgJson){

        var url= this.globals.HTTP_GLOBAL_ADDRESS || "http://localhost:3000";
        url += "/api/mailing/contact/new";
        
        return this.http
            .post(url, msgJson, {})
            .map((response: Response) => {
                return response.status;
            });
    }

    login(msgJson){
        var url= this.globals.HTTP_GLOBAL_ADDRESS || "http://localhost:3000";
        url += "/api/login";
        console.log("Sending to API");
        return this.http
            .post(url, msgJson, {})
            .map((response: Response) => {
                return response.status;
            });
    }

}