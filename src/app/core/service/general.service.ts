import { Injectable } from "@angular/core";

@Injectable()
export class GeneralService {
    currentLink: String = ''
    currentHypnosisSublink: String = ''
    
    public months = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ];

    constructor () { }

    printCurrentLink() {
        console.log(this.currentLink)
    }
    
    public getBlogCategory(currentBlog){
    
        if(currentBlog.category == "hypnosis"){
          return "Zapisi o hipnozi";
        } else if(currentBlog.category == "creative"){
          return "Kreativne terapevtske tehnike";
        } else if(currentBlog.category == "personal"){
          return "Moja razmišljanja";
        } else if(currentBlog.category == "rest"){
          return "Ostali navdihi"
        } 
      }
    
    public datePipe(currentBlog){
        //Created custom - tolocaledateString not really supported in all browser
        var fSPlt = currentBlog.datePosted.split("T");
        var lSplt = fSPlt[0].split("-");
        
        const mnth = this.months[(Number)(lSplt[1]) - 1];
    
        return lSplt[2] + '. ' + mnth + ' ' + lSplt[0];
    
      }
}