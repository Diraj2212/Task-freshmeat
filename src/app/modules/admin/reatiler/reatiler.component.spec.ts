import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReatilerComponent } from './reatiler.component';

describe('ReatilerComponent', () => {
  let component: ReatilerComponent;
  let fixture: ComponentFixture<ReatilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReatilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReatilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
