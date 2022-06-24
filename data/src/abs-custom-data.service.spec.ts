import { TestBed } from '@angular/core/testing';

import { AbsCustomDataService } from './abs-custom-data.service';

describe('AbsCustomDataService', () => {
  let service: AbsCustomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsCustomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
