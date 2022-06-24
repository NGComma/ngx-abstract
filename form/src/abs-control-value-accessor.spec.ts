import { AbsControlValueAccessor } from './abs-control-value-accessor';

class TestClass extends AbsControlValueAccessor<any> {
  writeValue(obj: any): void {}
}

describe('AbsControlValueAccessor', () => {
  it('should create an instance', () => {
    expect(new TestClass()).toBeTruthy();
  });
});
