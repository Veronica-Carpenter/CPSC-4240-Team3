import { TestBed } from '@angular/core/testing';

import { TimelyAPIService } from './timely-api.service';

describe('TimelyAPIService', () => {
  let service: TimelyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
