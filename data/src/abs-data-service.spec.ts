import { Observable, of } from 'rxjs';
import { AbsDataService } from './abs-data-service.service';

interface MyData {
  id: number;
}

class TestClass extends AbsDataService<MyData> {
  pageSize = 30;
}

function obs(): Observable<MyData[]> {
  return of([]);
}

describe('AbsPaginationDataService', () => {
  it('should create an instance', () => {
    expect(new TestClass(obs)).toBeTruthy();
  });
});
