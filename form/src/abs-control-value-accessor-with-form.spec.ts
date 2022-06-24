import { FormGroup } from '@angular/forms';
import { AbsControlValueAccessorWithForm } from './abs-control-value-accessor-with-form';

class TestClass extends AbsControlValueAccessorWithForm<any> {
  form = new FormGroup({});

  writeValue(obj: any): void {}
}

describe('AbsControlValueAccessorWithForm', () => {
  it('should create an instance', () => {
    expect(new TestClass()).toBeTruthy();
  });
});
