import { Directive } from '@angular/core';

import { AbsSimpleClass } from './abs-simple-class';

/**
 * Simple abstract class with `destroyed$` & `subscription`
 * @example
 * ```ts
 * export class MyClass extends AbsComponent {}
 * ```
 */
@Directive()
export abstract class AbsComponent extends AbsSimpleClass {}
