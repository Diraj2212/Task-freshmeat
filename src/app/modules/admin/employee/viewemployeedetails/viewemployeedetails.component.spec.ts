import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemployeedetailsComponent } from './viewemployeedetails.component';

describe('ViewemployeedetailsComponent', () => {
  let component: ViewemployeedetailsComponent;
  let fixture: ComponentFixture<ViewemployeedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewemployeedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewemployeedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
