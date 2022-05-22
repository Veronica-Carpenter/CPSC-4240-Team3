import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCoursePageComponent } from './professor-course-page.component';

describe('ProfessorCoursePageComponent', () => {
  let component: ProfessorCoursePageComponent;
  let fixture: ComponentFixture<ProfessorCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorCoursePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
