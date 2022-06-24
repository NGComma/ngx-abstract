import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { INgxAbsDialogConfig } from './ngx-abs-dialog.service';

export class NgxAbsDialogRef<T, R = undefined> {
  private onClose = new Subject<R | undefined>();

  constructor(
    private overlayRef: OverlayRef,
    readonly config: INgxAbsDialogConfig<T>
  ) {
    if (config.backdropClickClose) {
      this.backdropClick()
        .pipe(takeUntil(this.onClose))
        .subscribe(() => {
          this.close();
        });
    }
  }

  afterClosed(): Observable<R | undefined> {
    return this.onClose.asObservable();
  }

  backdropClick(): Observable<MouseEvent> {
    return this.overlayRef.backdropClick();
  }

  keydownEvents(): Observable<KeyboardEvent> {
    return this.overlayRef.keydownEvents();
  }

  close(modalResult?: R): void {
    this.overlayRef.dispose();
    this.onClose.next(modalResult);
    this.onClose.complete();
  }
}
