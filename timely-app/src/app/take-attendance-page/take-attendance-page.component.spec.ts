import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAttendancePageComponent } from './take-attendance-page.component';

describe('TakeAttendancePageComponent', () => {
  let component: TakeAttendancePageComponent;
  let fixture: ComponentFixture<TakeAttendancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeAttendancePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
