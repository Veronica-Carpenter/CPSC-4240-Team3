import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureListPageComponent } from './lecture-list-page.component';

describe('LectureListPageComponent', () => {
  let component: LectureListPageComponent;
  let fixture: ComponentFixture<LectureListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
