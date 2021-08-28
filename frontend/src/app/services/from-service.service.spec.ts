import { TestBed } from '@angular/core/testing';

import { FromServiceService } from './from-service.service';

describe('FromServiceService', () => {
  let service: FromServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
