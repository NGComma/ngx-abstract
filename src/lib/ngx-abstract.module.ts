import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ABS_PAGE_CONFIG, IAbsPageConfig } from "../common/tokens";

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
  declarations: [],
  exports: []
})
export class NgxAbstractModule {
  static withConfig(config: INgxAbstractConfig): ModuleWithProviders<NgxAbstractModule> {
    return {
      ngModule: NgxAbstractModule,
      providers: [{ provide: ABS_PAGE_CONFIG, useValue: config.page || {} }]
    };
  }
}
