import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

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
    public picUrl;

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
        }
        

        this.blogService.getSignedRequest(this.uploadFile)
                            .subscribe(data => {
                                const s3Data = JSON.parse(data.text());
                                if(s3Data.message === 'success') {
                                    this.blogService.uploadPicture(this.uploadFile, s3Data.data.signedRequest, s3Data.data.url)
                                                    .subscribe( data => {
                                                        console.log("data");
                                                        console.log(data);
                                                        this.picUrl = s3Data.data.url;
                                                    }, error => {
                                                        console.log("error");
                                                        console.log(error);
                                                    });
                                } else {
                                    console.log("Failed to get signed URL for picture");
                                    console.log(data);
                                }
                                
                            }, error => {
                                console.log(error);
                            })

    }

    submitBlog() {}

}