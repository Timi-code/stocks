import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotContrastComponent } from './hot-contrast.component';

describe('HotContrastComponent', () => {
  let component: HotContrastComponent;
  let fixture: ComponentFixture<HotContrastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotContrastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotContrastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
