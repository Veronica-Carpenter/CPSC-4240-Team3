import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorHomePageComponent } from './course-list-page.component';

describe('ProfessorHomePageComponent', () => {
  let component: ProfessorHomePageComponent;
  let fixture: ComponentFixture<ProfessorHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
