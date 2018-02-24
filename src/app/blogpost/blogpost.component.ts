import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../core/service/general.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.currentLink = 'blogpost';
  }

}
