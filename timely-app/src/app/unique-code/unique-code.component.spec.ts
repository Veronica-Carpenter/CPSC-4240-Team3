import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueCodeComponent } from './unique-code.component';

describe('UniqueCodeComponent', () => {
  let component: UniqueCodeComponent;
  let fixture: ComponentFixture<UniqueCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
