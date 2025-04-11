import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEmployeeUpdateStatusComponent } from './retailer-employee-update-status.component';

describe('RetailerEmployeeUpdateStatusComponent', () => {
  let component: RetailerEmployeeUpdateStatusComponent;
  let fixture: ComponentFixture<RetailerEmployeeUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEmployeeUpdateStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerEmployeeUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
