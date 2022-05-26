import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentListPageComponent } from './view-student-list-page.component';

describe('ViewStudentListPageComponent', () => {
  let component: ViewStudentListPageComponent;
  let fixture: ComponentFixture<ViewStudentListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
