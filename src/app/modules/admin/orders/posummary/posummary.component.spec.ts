import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POSummaryComponent } from './posummary.component';

describe('POSummaryComponent', () => {
  let component: POSummaryComponent;
  let fixture: ComponentFixture<POSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [POSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(POSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
