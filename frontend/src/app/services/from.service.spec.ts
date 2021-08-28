import { TestBed } from '@angular/core/testing';

import { FromService } from './from.service';

describe('FromServiceService', () => {
  let service: FromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
