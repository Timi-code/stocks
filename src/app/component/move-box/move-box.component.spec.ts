import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBoxComponent } from './move-box.component';

describe('MoveBoxComponent', () => {
  let component: MoveBoxComponent;
  let fixture: ComponentFixture<MoveBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
