import { InjectionToken } from '@angular/core';

/**
 * Page configuration interface
 */
export interface IAbsPageConfig {
  /**
   * If prefix exists, it must contain {title} inside.
   */
  prefix?: string;
}

/**
 * Page configuration token
 */
export const ABS_PAGE_CONFIG = new InjectionToken<IAbsPageConfig>(
  'AbsPage configuration',
  {
    factory: () => ({}),
  }
);
