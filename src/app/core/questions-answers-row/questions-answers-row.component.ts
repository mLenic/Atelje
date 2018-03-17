import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-questions-answers-row',
  templateUrl: './questions-answers-row.component.html',
  styleUrls: ['./questions-answers-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionsAnswersRowComponent implements OnInit {

  @Input()
  content: any[];
  currentlyShownElement: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentlyShownElement = this.content[0];
  }

  currentBlogTest(content){
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  elementClicked(element) {
    //if any other question was shown close it
    if (this.currentlyShownElement != element && this.currentlyShownElement != null) {
      this.currentlyShownElement.show = false;  
    }
    //show or hide this element
    element.show = !element.show;
    this.currentlyShownElement = element;
  }
}
