import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEmployeeEditComponent } from './retailer-employee-edit.component';

describe('RetailerEmployeeEditComponent', () => {
  let component: RetailerEmployeeEditComponent;
  let fixture: ComponentFixture<RetailerEmployeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEmployeeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
