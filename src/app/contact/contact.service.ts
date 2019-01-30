import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Globals } from '../../../globals';

@Injectable()
export class ContactService {

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

    sendApplicationMail(msgJson) {
      var url= this.globals.HTTP_GLOBAL_ADDRESS || "http://localhost:3000";
        url += "/api/mailing/application/new";

        return this.http
            .post(url, msgJson, {})
            .map((response: Response) => {
                return response.status;
            });
    }
}
