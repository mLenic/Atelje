import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { HiddenService } from '../service/hidden.service';

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
    
    public response = {
        status: null,
        message: null,  
    }

    constructor(
        private fb: FormBuilder,
        private srv: HiddenService,) { }


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

    submitBlog() {}

}