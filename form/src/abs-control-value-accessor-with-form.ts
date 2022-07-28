import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";

import { AbsControlValueAccessor } from "./abs-control-value-accessor";

/**
 * Standard abstract class with `ControlValueAccessor` implementation and form group
 */
@Directive()
export abstract class AbsControlValueAccessorWithForm<T> extends AbsControlValueAccessor<T> {
  abstract form: FormGroup;

  get info(): T {
    return this.form?.value;
  }

  get infoChanges$(): Observable<T> {
    return this.form?.valueChanges.pipe(startWith(this.info));
  }

  override setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
    super.setDisabledState(isDisabled);
  }

  abstract override writeValue(obj: any): void;
}
