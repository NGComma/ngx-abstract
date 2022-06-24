import { Directive, ElementRef, TemplateRef } from '@angular/core';

import { NgxAppInjector } from '../lib/abstract.module';
import { AbsSimpleClass } from './abs-simple-class';

/**
 * Simple abstract directive with common properties.
 * @example
 * ```ts
 * export class MyDirective extends AbsDirective {}
 * ```
 */
@Directive()
export abstract class AbsDirective<T = HTMLElement> extends AbsSimpleClass {
  /**
   * Template reference of directive in case of `*sugar` directive
   */
  readonly templateRef = NgxAppInjector.get(TemplateRef);
  /**
   * @internal
   * @private
   */
  private readonly elementRef = NgxAppInjector.get<ElementRef<T>>(ElementRef);

  /**
   * Directive's HTMLElement
   */
  get el(): T {
    return this.elementRef.nativeElement;
  }
}
