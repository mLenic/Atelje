import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class Globals {

    HTTP_GLOBAL_ADDRESS: string;
    WS_NOTIFICATIONS_ADDRESS: string;
    STORAGE_USER: string = 'user';
    STORAGE_LOGGEDIN: string = 'logged_in';

    constructor(platformLocation: PlatformLocation){
        //this.HTTP_GLOBAL_ADDRESS = (platformLocation as any).location.hostname; //Try this on production
        this.HTTP_GLOBAL_ADDRESS = "http://terapevtski-atelje.herokuapp.com";
        //this.HTTP_GLOBAL_ADDRESS = "http://localhost:3000";
    }
}