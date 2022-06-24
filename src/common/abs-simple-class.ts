import { Directionality } from '@angular/cdk/bidi';
import { Directive, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { NgxAppInjector } from '../lib/abstract.module';

/**
 * Simple class which contains simple & common methods
 * @internal
 */
@Directive()
export class AbsSimpleClass implements OnDestroy {
  destroyed$ = new Subject<void>();
  subscription = new Subscription();
  readonly ngZone = NgxAppInjector.get(NgZone);
  readonly direction = NgxAppInjector.get(Directionality);
  readonly renderer2 = NgxAppInjector.get(Renderer2);

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
