import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ABS_PAGE_CONFIG, IAbsPageConfig } from "../common/tokens";
import { LazyViewportDirective } from './lazy-viewport.directive';

/**
 * Default NgxAbstract configuration
 */
export interface INgxAbstractConfig {
  /**
   * Add a prefix to page title
   * @example
   * NgxAbstractModule.withConfig({
   *   page: {
   *     prefix: '{title} | My super brand'
   *   }
   * })
   */
  page?: IAbsPageConfig;
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    LazyViewportDirective
  ],
  exports: [
    LazyViewportDirective
  ]
})
export class NgxAbstractModule {
  static withConfig(config: INgxAbstractConfig): ModuleWithProviders<NgxAbstractModule> {
    return {
      ngModule: NgxAbstractModule,
      providers: [{ provide: ABS_PAGE_CONFIG, useValue: config.page || {} }]
    };
  }
}
