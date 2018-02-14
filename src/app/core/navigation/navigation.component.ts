import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  whiteNavBg: boolean = false
  windowHeight = 0

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.windowHeight = window.innerHeight
  }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    
    const scrollTop = window.scrollY
    const windowHeight = window.outerHeight
    console.log(scrollTop)
    console.log(this.windowHeight)
    
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
  scrollToTop()
  {
    this.document.body.scrollTop = 0;
  }
}
