import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { AbsComponent } from '@ngcomma/ngx-abstract';

/**
 * Standard abstract class with `ControlValueAccessor` implementation
 */
@Directive()
export abstract class AbsControlValueAccessor<T>
  extends AbsComponent
  implements ControlValueAccessor
{
  onChange: ((_: T) => void) | undefined;
  onTouched: (() => void) | undefined;

  private disable$ = new BehaviorSubject(false);

  get isDisabled$(): Observable<boolean> {
    return this.disable$.asObservable();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disable$.next(isDisabled);
  }

  abstract writeValue(obj: any): void;
}
