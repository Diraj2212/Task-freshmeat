import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEmployeeComponent } from './retailer-employee.component';

describe('RetailerEmployeeComponent', () => {
  let component: RetailerEmployeeComponent;
  let fixture: ComponentFixture<RetailerEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
