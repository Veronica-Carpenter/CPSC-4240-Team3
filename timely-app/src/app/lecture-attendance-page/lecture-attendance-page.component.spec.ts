import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureAttendancePageComponent } from './lecture-attendance-page.component';

describe('LectureAttendancePageComponent', () => {
  let component: LectureAttendancePageComponent;
  let fixture: ComponentFixture<LectureAttendancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureAttendancePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
