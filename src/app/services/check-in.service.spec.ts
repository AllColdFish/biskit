import { TestBed } from '@angular/core/testing';

import { CheckInService } from './check-in.service';

describe('CheckInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckInService = TestBed.get(CheckInService);
    expect(service).toBeTruthy();
  });
});
