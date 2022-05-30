import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWelcomePageComponent } from './new-welcome-page.component';

describe('NewWelcomePageComponent', () => {
  let component: NewWelcomePageComponent;
  let fixture: ComponentFixture<NewWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWelcomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
