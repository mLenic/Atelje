import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRecordingsComponent } from './about-recordings.component';

describe('AboutRecordingsComponent', () => {
  let component: AboutRecordingsComponent;
  let fixture: ComponentFixture<AboutRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
