import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionConfirmComponent } from './deletion-confirm.component';

describe('DeletionConfirmComponent', () => {
  let component: DeletionConfirmComponent;
  let fixture: ComponentFixture<DeletionConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
