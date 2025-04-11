import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerEmployeeViewComponent } from './retailer-employee-view.component';

describe('RetailerEmployeeViewComponent', () => {
  let component: RetailerEmployeeViewComponent;
  let fixture: ComponentFixture<RetailerEmployeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerEmployeeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
