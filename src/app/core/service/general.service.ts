import { Injectable } from "@angular/core";

@Injectable()
export class GeneralService {
    currentLink: String = ''

    constructor () { }

    printCurrentLink() {
        console.log(this.currentLink)
    }
}