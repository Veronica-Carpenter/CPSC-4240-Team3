import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentPageComponent } from './new-student-page.component';

describe('NewStudentPageComponent', () => {
  let component: NewStudentPageComponent;
  let fixture: ComponentFixture<NewStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStudentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
