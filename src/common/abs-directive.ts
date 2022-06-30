import { Directive, ElementRef, inject, InjectFlags, TemplateRef, ViewContainerRef } from "@angular/core";

import { AbsSimpleClass } from "./abs-simple-class";

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
  readonly templateRef = inject(TemplateRef, InjectFlags.Optional);
  /**
   * Directive's View container reference
   */
  readonly viewContainerRef = inject(ViewContainerRef);
  /**
   * @internal
   * @private
   */
  private readonly elementRef = inject<ElementRef<T>>(ElementRef);

  /**
   * Directive's HTMLElement
   */
  get el(): T {
    return this.elementRef.nativeElement;
  }
}
