import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseControlComponent } from './expense-control.component';

describe('ExpenseControlComponent', () => {
  let component: ExpenseControlComponent;
  let fixture: ComponentFixture<ExpenseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
