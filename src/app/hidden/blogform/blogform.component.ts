import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'

import { HiddenService } from '../service/hidden.service';
import { BlogService } from '../../core/service/blog.service';


@Component({
    selector: 'app-blogform',
    templateUrl: './blogform.component.html',
    styleUrls: ['./blogform.component.scss']
})
export class BlogformComponent implements OnInit {
    public blogpostForm:       FormGroup;

    public title:           FormControl;
    public subtitle:        FormControl;
    public description:     FormControl;
    public message:         FormControl;

    public levelNum:        string;
    public colour:          string;

    public uploadFile: File;

    public picUrls: Array<any> = new Array<string>();
    
    public uploadStatusMessage: string = "Please select a file";

    public response = {
        status: null,
        message: null,  
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
    
        this.blogpostForm = this.fb.group({
            title:          this.title,
            subtitle:       this.subtitle,
            description:    this.description,
            message:        this.message,
        });
    
    }

    initializeForm(){
        this.blogpostForm.controls['title'].setValue("");
        this.blogpostForm.controls['subtitle'].setValue("");
        this.blogpostForm.controls['description'].setValue("");
        this.blogpostForm.controls['message'].setValue("");

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
}