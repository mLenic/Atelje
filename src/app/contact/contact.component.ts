import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  public name:        FormControl;
  public email:       FormControl;
  public message:     FormControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  public validationMessages = {
    'name': {
        'required':     'Manjkajoče ime.',
        'minlength':    'Ime kampanije mora vsebovati vsaj en znak.'
    },
    'message': {
        'required':     'Manjkajoče sporočilo.',
    },
    'email': {
        'required':     'Manjkajoč Email.',
        'email':        'Napačna oblika Email naslova.'
    }
    
  };

  public formErrors = {
    'name': '',
    'message': '',
    'email':'',
  };

  private buildForm() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]);
    this.message = new FormControl('', [
      Validators.required,
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.contactForm = this.fb.group({
      name: this.name,
      message: this.message,
      email: this.email,
    });

  }


  private onValueChanged(data?: any) {
      console.log("value changed");
      if (!this.contactForm) { return; }
      const form = this.contactForm;

      // tslint:disable-next-line:forin
      for (const field in this.formErrors) {
          // Clear previous messages if there are any
          this.formErrors[field] = '';
          const control = form.get(field);

          if (control && !control.valid) {
              const messages = this.validationMessages[field];
              // tslint:disable-next-line:forin
              for (const key in control.errors) {
                  this.formErrors[field] += messages[key] + ' ';
              }
          }
      }

  }
  initializeForm(){
    this.contactForm.controls['name'].setValue("");
    this.contactForm.controls['message'].setValue("");
  }
  sendMail() {
    this.onValueChanged(this.contactForm);
    if(this.contactForm.valid){
      //send mail
      console.log("Sending mail");
    }
  }

}
