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
        this.initializeContentHTML();
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
        this.blogpostForm.controls['title'].setValue("");
        this.blogpostForm.controls['subtitle'].setValue("");
        this.blogpostForm.controls['description'].setValue("");
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

        this.setStatus("Getting file signature");
        var s3Data = null;
        const awsS3Operations = this.blogService.getSignedRequest(this.uploadFile)
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

    submitBlog() {}

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
                    '<p>' + element.val + '</p>'
                );
            } else if(element.idval === 'Quote'){
                this.blogContent.content = this.blogContent.content.concat(
                    '<div class="blogpost-quote">'
                        + '<div class="gradient-line-right quote-line"></div>'
                        + '<div class="quote-text">'
                            + element.val
                        + '</div>'
                        + '<div class="quote-author"> - '
                            + element.author
                        + '</div>'
                        + '<div class="gradient-line-right quote-line"></div>'
                    + '</div>'

        ); 
            }
        });

        this.finalizeContentHTML();
    }
}