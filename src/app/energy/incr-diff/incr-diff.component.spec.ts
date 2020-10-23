import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrDiffComponent } from './incr-diff.component';

describe('IncrDiffComponent', () => {
  let component: IncrDiffComponent;
  let fixture: ComponentFixture<IncrDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
