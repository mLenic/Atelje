import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class AuthGuard implements CanActivate {

    private pwdMd5 = '65b9e48b0399b3d9010b510079560ebb';

    constructor(    
        private router: Router,)
        { }

    canActivate(    route: ActivatedRouteSnapshot, 
                    state: RouterStateSnapshot,) {
        var pwd = localStorage.getItem('pwd');                        
        if(pwd == null || Md5.hashStr(pwd).toString() != this.pwdMd5){
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
        
    }
}