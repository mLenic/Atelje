import { Component, OnInit, Inject, HostListener, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { RouterLinkActive } from '@angular/router'

import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() navigation
  whiteNavBg: boolean = false
  bgTransition: boolean = true
  windowHeight = 0
  mobileNavigation: boolean = false

  constructor(@Inject(DOCUMENT) private document: Document, private generalService: GeneralService) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    
    const scrollTop = window.scrollY
    const windowHeight = window.outerHeight
    console.log(scrollTop)
    console.log(this.windowHeight)
    
    //if currentLink is blog, home or hypnosis, nav bg becomes white at 1/4 of window height
    if(this.generalService.currentLink == 'blog' || this.generalService.currentLink == 'therapy' || this.generalService.currentLink == 'home' || this.generalService.currentHypnosisSublink == 'about-hypnosis') 
    {
      if(scrollTop > (this.windowHeight / 4))
      {
          console.log("oi")
          this.whiteNavBg = true
          console.log(this.whiteNavBg)
      }
      else {
          this.whiteNavBg = false
          console.log(this.whiteNavBg)
      }
    }
    //for other links nav bg becomes white at scroll
    else {
      if(this.generalService.currentLink == 'blogpost') {
        this.bgTransition = false
      }
      if(scrollTop > 1)
      {
          this.whiteNavBg = true
          console.log(this.whiteNavBg)
      }
      else {
          this.whiteNavBg = false
          console.log(this.whiteNavBg)
      }
    }
  }
  scrollToTop()
  {
    this.document.body.scrollTop = 0;
  }

  toggleMobileNavigation() {
    this.mobileNavigation = !this.mobileNavigation
    console.log(this.mobileNavigation)
  }
}
