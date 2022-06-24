import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxAbsDialogCloseDirective } from './ngx-abs-dialog-close.directive';
import { NgxAbsDialog } from './ngx-abs-dialog.service';

@NgModule({
  declarations: [NgxAbsDialogCloseDirective],
  imports: [CommonModule, OverlayModule],
  providers: [NgxAbsDialog],
  exports: [NgxAbsDialogCloseDirective],
})
export class NgxAbstractDialogModule {}
