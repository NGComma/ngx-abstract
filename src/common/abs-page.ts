import { Directive, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { AbsComponent } from './abs-component';
import { ABS_PAGE_CONFIG } from './tokens';

/**
 * An abstract class with page title and description.
 * @example
 * class MyPage extends AbsPage {
 *   constructor() {
 *     super('My awesome title', 'My super description')
 *   }
 * }
 */
@Directive()
export abstract class AbsPage extends AbsComponent {
  /**
   * Add, Remove or Change page Meta tags
   */
  readonly meta = inject(Meta);
  /**
   * @internal
   */
  private readonly title = inject(Title);
  /**
   * @internal
   */
  private readonly config = inject(ABS_PAGE_CONFIG);

  constructor(title: string, description: string, withPrefix?: boolean) {
    super();
    this.setTitle(title, withPrefix);
    this.setDescription(description);
  }

  /**
   * Change page title dynamically
   * @param title The new page title
   * @param withPrefix Whether to include the prefix to title or not
   */
  setTitle(title: string, withPrefix = true): void {
    const { prefix } = this.config;
    if (withPrefix && prefix && /{title}/gi.test(prefix)) {
      this.title.setTitle(prefix.replace(/{title}/gi, title));
    } else {
      this.title.setTitle(title);
    }
  }

  /**
   * Change page description dynamically
   * @param description The new page description
   */
  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }
}
