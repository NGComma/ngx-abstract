import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Directive,
  inject,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

/**
 * Simple class which contains simple & common methods
 * @internal
 */
@Directive()
export class AbsSimpleClass implements OnDestroy {
  destroyed$ = new Subject<void>();
  subscription = new Subscription();
  readonly ngZone = inject(NgZone);
  readonly direction = inject(Directionality);
  readonly renderer2 = inject(Renderer2);
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  /**
   * Returns true if the application is in RTL direction
   */
  get isRTL(): boolean {
    return this.direction.value === 'rtl';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.subscription.unsubscribe();
  }
}
