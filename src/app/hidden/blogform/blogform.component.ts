import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'

import { HiddenService } from '../service/hidden.service';
import { BlogService } from '../../core/service/blog.service';


@Component({
    selector: 'app-blogform',
    templateUrl: './blogform.component.html',
    styleUrls: ['./blogform.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogformComponent implements OnInit {
    public blogpostForm:       FormGroup;

    public title:           FormControl;
    public subtitle:        FormControl;
    public description:     FormControl;
    public message:         FormControl;
    public quoteAuthor:         FormControl;
    public category:        string;

    public levelNum:        string;
    public colour:          string;

    public uploadFile: File;

    public picUrls: Array<any> = new Array<string>();
    
    public uploadStatusMessage: string = "Please select a file";

    public response = {
        status: null,
        message: null,  
    }
    public blogTestDisplay: string = ""; //For displaying how blog will look like


    /**
     * Elements is an array of values and their idvalues element e.g. 
     *          {idval: 'p', val: 'opis......'}, {idval: 'quote', val: 'Nek citat pravi...', author: 'John'}
     */
    public blogContent = {
        content: "",
        elements: [],
        counter: 0,
    }

    constructor(
        private fb: FormBuilder,
        private srv: HiddenService,
        private blogService: BlogService,
    ) { }


    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.title = new FormControl('', []);
        this.subtitle = new FormControl('', []);
        this.description = new FormControl('', []);
        this.message = new FormControl('', []);
        this.quoteAuthor = new FormControl('', []);
    
        this.blogpostForm = this.fb.group({
            title:          this.title,
            subtitle:       this.subtitle,
            description:    this.description,
            message:        this.message,
            quoteAuthor:    this.quoteAuthor,
        });
    
    }

    initializeForm(){
        this.blogpostForm.controls['title'].setValue("Naslov");
        this.blogpostForm.controls['subtitle'].setValue("Podnaslov");
        this.blogpostForm.controls['description'].setValue("Opis");
        this.blogpostForm.controls['message'].setValue("");
        this.blogpostForm.controls['quoteAuthor'].setValue("");

    }

    
    onFileInputChange(files: FileList){
        this.uploadFile = files.item(0);
        
        if(this.uploadFile == null){
            console.log("No file selected");
            this.setStatus("Please select a file");
            return;
        }
        debugger;
        var pwd = localStorage.getItem('pwd');
        
        if(pwd == null){
            this.response.status = 500;
            this.response.message = "Neuspešen prenos slike. Ponovno se vpiši."
        }
        var form = {
            pwd: pwd,
        }
        this.setStatus("Getting file signature");
        var s3Data = null;
        const awsS3Operations = this.blogService.getSignedRequest(this.uploadFile, form)
            .pipe(
                mergeMap(
                    (data:Response) => {
                        s3Data = JSON.parse(data.text());
                        this.setStatus("Success getting file signature. Uploading file");
                        if(s3Data.message === 'success'){
                            return this.blogService.uploadPicture(this.uploadFile, s3Data.data.signedRequest, s3Data.data.url);
                        } else {
                            throw Observable.throw("Error in getting signed request."); 
                        }
                    }
                )
            );

        awsS3Operations.subscribe(data => {
            this.picUrls.push({url: s3Data.data.url});
            this.setStatus("Successfully uploaded file. Please choose new file.");
        }, error => {
            this.setStatus("Error occured while uploading file. Try again please");
            console.log(error);
        });

    }

    //Submits blog to server
    submitBlog() {
        this.blogContent.content = "";

        var pwd = localStorage.getItem('pwd');
        
        if(pwd == null){
            this.response.status = 500;
            this.response.message = "Neuspešen vnos bloga. Ponovno se vpiši."
        }
        //Creates HTML inside this.blogContent.content variable
        this.createContentHTMLFromElements();

        var form = {
            title: this.blogpostForm.controls['title'].value,
            subtitle: this.blogpostForm.controls['subtitle'].value,
            description: this.blogpostForm.controls['description'].value,
            message: this.blogContent.content,
            category: this.category,
            colour: this.colour,
            pictures: this.picUrls,
            pwd: pwd,
        }
        console.log(form);

        this.blogService.saveBlogPost(form)
                        .subscribe(data => {
                            this.response.status = 200;
                            this.response.message = "Uspešen vnos bloga."
                        }, error => {
                            this.response.status = 400;
                            this.response.message = "Neuspešen vnos bloga."
                        })
    }

    clearImage(imgUrl: string){
        this.setStatus("Picture deleted. Please select a file.")
        this.picUrls = this.picUrls.filter(url => url.url != imgUrl);
    }

    setStatus(msg: string){
        this.uploadStatusMessage = msg;
    }

    /**
     * Methods that deal with creating blog post
     */
    initializeContentHTML(){
        this.blogContent.content = this.blogContent.content.concat(
            '<div class="blogpost-content">'
        );
    }

    finalizeContentHTML(){
        this.blogContent.content = this.blogContent.content.concat(
            '</div>'
        );
    }

    addParagraphContentHTML(){
        var contentEl = this.message.value;
        let el = {id: this.blogContent.counter, idval: 'Paragraph', val: contentEl, author: null};
        
        this.blogContent.counter += 1;
        this.blogContent.elements.push(el);
        
        this.clearContent(false);
        console.log(this.blogContent.content);
    }

    addQuoteContentHTML(){
        
        var contentEl = this.message.value;
        var contentAuthor = this.quoteAuthor.value;

        let el = {id: this.blogContent.counter, idval: 'Quote', val: contentEl, author: contentAuthor};

        this.blogContent.counter += 1;
        this.blogContent.elements.push(el);

        
        this.clearContent(true);
        console.log(this.blogContent.content);
    }

    clearContent(delAuthor: boolean){
        this.message.setValue("");
        if(delAuthor) this.quoteAuthor.setValue("");
    }
    deleteContentElement(elementId: number){
        var idx = null;
        for(var i = 0; i < this.blogContent.elements.length; i++){
            if(this.blogContent.elements[i].id == elementId){
                idx = i;
            }
        }

        this.blogContent.elements.splice(idx, 1);
    }

    reviewContentHTML(){
        this.blogContent.content = "";
        this.createContentHTMLFromElements();
        this.blogTestDisplay = this.blogContent.content;

        this.clearContent(true);
    }

    createContentHTMLFromElements(){
        this.initializeContentHTML();

        this.blogContent.elements.forEach(element => {
            if(element.idval === 'Paragraph'){
                this.blogContent.content = this.blogContent.content.concat(
                    '<p>' + element.val + '</p></br>'
                );
            } else if(element.idval === 'Quote'){
                this.blogContent.content = this.blogContent.content.concat(
                    '<div class="blogpost-quote">'
                        + '<div class="gradient-line-right quote-line quote-line-top" [class.quote-animation-line]="animateText"></div>'
                        + '<div class="quote-text" [class.quote-animation]="animateText">'
                            + element.val
                        + '</div>'
                        + '<div class="quote-author" [class.quote-animation]="animateAuthor"> - '
                            + element.author
                        + '</div>'
                        + '<div class="gradient-line-right quote-line quote-line-bottom" [class.quote-animation-line]="animateAuthor"></div>'
                    + '</div>'

                ); 
            }
        });
        this.createGallery();
        //this.createButtons();
        this.finalizeContentHTML();
    }

    createGallery(){
        this.blogContent.content = this.blogContent.content.concat(
            '<div class="blogpost-gallery">'
        );
        for(var i = 0; i < this.picUrls.length; i++){
            if(i == 0) continue;
            
            this.blogContent.content = this.blogContent.content.concat(
                '<div class="gallery-img-div">'
            );

            this.blogContent.content = this.blogContent.content.concat(
                '<img class="gallery-img" src="' + this.picUrls[i].url + '">'
                
            );

            this.blogContent.content = this.blogContent.content.concat(
                '</div>'
            );
        }

        this.blogContent.content = this.blogContent.content.concat(
            '</div>'
        );
    }

    createButtons(){
        this.blogContent.content = this.blogContent.content.concat(
            '<div class="blogpost-next-previous-wrapper">'
             + '<div class="next-previous-button-div">'
              + '<button class="button-gradient" (click)="loadNextBlogPost(true)">PREJŠNJI</button>'
             + '</div>'
             + '<div class="next-previous-button-div">'
              + '<button class="button-gradient" (click)="loadNextBlogPost(false)">NASLEDNJI</button>'
             + '</div>'
            + '</div>'
            
        );
        /* <div class="blogpost-next-previous-wrapper">
          <div class="next-previous-button-div">
              <button class="button-gradient" (click)="loadNextBlogPost(true)">PREJŠNJI</button>
          </div>
          <div class="next-previous-button-div">
              <button class="button-gradient" (click)="loadNextBlogPost(false)">NASLEDNJI</button>
          </div>
      </div> */
    }
}