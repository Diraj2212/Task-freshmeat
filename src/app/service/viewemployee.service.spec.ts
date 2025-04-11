import { TestBed } from '@angular/core/testing';

import { ViewemployeeService } from './viewemployee.service';

describe('ViewemployeeService', () => {
  let service: ViewemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
