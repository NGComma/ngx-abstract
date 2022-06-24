import { TestBed } from '@angular/core/testing';

import { AbsCollectionService } from './abs-collection.service';

class Collection extends AbsCollectionService<any> {
  entityName: string;
  pluralEntityName: string;
  uniqueKey: keyof any;
}

describe('AbsPaginationService', () => {
  let service: Collection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
