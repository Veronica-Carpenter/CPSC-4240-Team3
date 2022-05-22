import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSubmittedPageComponent } from './attendance-submitted-page.component';

describe('AttendanceSubmittedPageComponent', () => {
  let component: AttendanceSubmittedPageComponent;
  let fixture: ComponentFixture<AttendanceSubmittedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceSubmittedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSubmittedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
