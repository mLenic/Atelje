import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HiddenService } from '../service/hidden.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    public password:        FormControl;
    public email:           FormControl;


    public response = {
        status: null,
        message: null,  
    }

    constructor(
        private fb: FormBuilder,
        private srv: HiddenService,
        private router: Router,
      ) {}

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.password = new FormControl('', []);
        this.email = new FormControl('', []);
    
        this.loginForm = this.fb.group({
          password: this.password,
          email: this.email,
        });
    
    }

    initializeForm(){
        this.loginForm.controls['password'].setValue("");
        this.loginForm.controls['email'].setValue("");
    }

    login(){
        var form = {
            password: this.loginForm.controls['password'].value,
            email: this.loginForm.controls['email'].value,
            
        }
        console.log(form);
        this.srv.login(form)
                  .subscribe(data => {
                    if(data == 200){
                      this.response.status = 200;
                      this.response.message = "Uspešen vpis."
                      localStorage.setItem("pwd", form.password);
                      this.router.navigate(['/hidden/blogpost']);
                    } else {
                      this.response.status = 400;
                      this.response.message = "Neuspešen vpis."
                    }
                  }, error => {
                    this.response.status = 400;
                    this.response.message = "Neuspešen vpis."
                  })
    }
}