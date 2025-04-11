import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisePOComponent } from './raisepo.component';

describe('RaisePOComponent', () => {
  let component: RaisePOComponent;
  let fixture: ComponentFixture<RaisePOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaisePOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaisePOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
