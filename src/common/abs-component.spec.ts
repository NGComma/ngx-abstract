import { AbsComponent } from './abs-component';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class ExtendedClass extends AbsComponent {
  subscription$ = new Subject()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {});
}

describe('AbsComponent', () => {
  it('should create an instance', () => {
    expect(new ExtendedClass()).toBeTruthy();
  });

  it('should have a subscription', () => {
    expect(new ExtendedClass().subscription$).toBeInstanceOf(Subscription);
  });

  it('should have a opened subscription', () => {
    expect(new ExtendedClass().subscription$.closed).toBeFalse();
  });

  it('should have a closed subscription', () => {
    const component = new ExtendedClass();
    component.ngOnDestroy();
    expect(component.subscription$.closed).toBeTrue();
  });
});
