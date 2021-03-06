import { Component, OnInit, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

import { GeneralService } from '../core/service/general.service';
import { ContactService } from '../contact/contact.service';
import { BlogService } from '../core/service/blog.service';

import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-eventpost',
  templateUrl: './eventpost.component.html',
  styleUrls: ['./eventpost.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventpostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router:         Router,
    private generalService: GeneralService,
    private blogService:    BlogService,
    private fb: FormBuilder,
    private contactService: ContactService,){}

  public  currentEvent: any = null;
  public _routeId: number = null;
  public applicationsOpen: boolean = false;

  public months = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ];

  public applicationForm: FormGroup;
  public name:        FormControl;
  public email:       FormControl;

  public terms = "Podatki se uporabljajo le za namene povratnega obveščanja o prijavi na delavnico in se ne hranijo.";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._routeId = params['id'];
      if(this._routeId == null){
        //What to do in error situation?
        console.log("Error in route");
      } else {
        this.fetchEvent();
      }
    });

    this.buildForm();
  }

  public response = {
    status: null,
    message: null,
  }

  public validationMessages = {
    'name': {
        'required':     'Manjkajoče ime.',
        'minlength':    'Ime mora vsebovati vsaj en znak.'
    },
    'email': {
        'required':     'Manjkajoč Email.',
        'email':        'Napačna oblika Email naslova.'
    }
  };

  public formErrors = {
    'name': '',
    'email':'',
  };

  private buildForm() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);


    this.applicationForm = this.fb.group({
      name: this.name,
      email: this.email,
    });

  }

  private onValueChanged(data?: any) {

      if (!this.applicationForm) { return; }
      const form = this.applicationForm;

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
    this.applicationForm.controls['name'].setValue("");
    this.applicationForm.controls['email'].setValue("");
  }

  fetchEvent() {
    this.blogService.getEvent(this._routeId)
        .subscribe((data) => {

          var res = JSON.parse(data.text());
          if(res.event.length > 0) {
            this.currentEvent = res.event[0];
          } else {
            this.router.navigate(['/dogodki']);
          }

          var eventDt = new Date(this.currentEvent.dateEvent);

          if(eventDt > new Date()) {
            this.applicationsOpen = true;
          }
        })
  }

  sendApplicationMail() {
    this.onValueChanged(this.applicationForm);

    if(this.applicationForm.valid){
      //send mail

      var form = {
        id: this._routeId,
        name: this.applicationForm.controls['name'].value,
        email: this.applicationForm.controls['email'].value,
        title: this.currentEvent.title,
        termsComplicance: true,
      }

      this.contactService.sendApplicationMail(form)
                  .subscribe(data => {
                    if(data == 200){
                      this.response.status = 200;
                      this.response.message = "Prijava je bilo uspešna.";
                    } else {
                      this.response.status = 400;
                      this.response.message = "Prijava ni bila uspešna. Prosim pošljite sporočilo na spela@terapevtski-atelje.si";
                    }
                  })
    }
  }
}
