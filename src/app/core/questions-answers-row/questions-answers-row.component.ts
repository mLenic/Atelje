import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-questions-answers-row',
  templateUrl: './questions-answers-row.component.html',
  styleUrls: ['./questions-answers-row.component.scss']
})
export class QuestionsAnswersRowComponent implements OnInit {

  @Input()
  content: any[];
  currentlyShownElement: any;

  constructor() { }

  ngOnInit() {
    this.currentlyShownElement = this.content[0];
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
