import { Directive, HostListener, Input } from '@angular/core';
import { AbsDirective } from '@ngcomma/ngx-abstract';

import { NgxAbsDialogRef } from './NgxAbsDialogRef';

@Directive({
  selector: '[absDialogClose]',
  exportAs: 'absDialogClose',
})
export class NgxAbsDialogCloseDirective extends AbsDirective {
  @Input() absDialogClose: any;

  constructor(private ngxAbsDialogRef: NgxAbsDialogRef<any>) {
    super();
  }

  @HostListener('click') close(): void {
    this.ngxAbsDialogRef.close(this.absDialogClose);
  }

  @HostListener('document:keydown.escape') escClose(): void {
    this.close();
  }
}
