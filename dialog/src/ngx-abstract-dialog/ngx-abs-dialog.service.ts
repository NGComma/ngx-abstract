import {
  ComponentType,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, StaticProvider } from '@angular/core';

import { NgxAbsDialogRef } from './NgxAbsDialogRef';
import { NGX_ABS_DIALOG_DATA } from './tokens';

export interface INgxAbsDialogConfig<T = any>
  extends Omit<OverlayConfig, 'positionStrategy'> {
  data?: T;
  backdropClickClose?: boolean;
}

@Injectable()
export class NgxAbsDialog {
  constructor(private overlay: Overlay, private injector: Injector) {}

  static createConfig<T>(
    config?: INgxAbsDialogConfig<T>
  ): INgxAbsDialogConfig<T> {
    return {
      backdropClickClose: true,
      hasBackdrop: true,
      disposeOnNavigation: false,
      ...config,
    };
  }

  open<T, R = any>(
    cmp: ComponentType<any>,
    config?: INgxAbsDialogConfig<T>,
    providers?: StaticProvider[]
  ): NgxAbsDialogRef<T, R> {
    const configOptions = NgxAbsDialog.createConfig(config);
    const overlay = this.overlay.create(configOptions);
    const position = new GlobalPositionStrategy();
    overlay.updatePositionStrategy(position);
    position.centerHorizontally();
    position.centerVertically();
    const modalRef = new NgxAbsDialogRef<T, R>(overlay, configOptions);
    const cmpPortal = new ComponentPortal(
      cmp,
      null,
      Injector.create({
        providers: [
          { provide: NGX_ABS_DIALOG_DATA, useValue: config?.data },
          { provide: NgxAbsDialogRef, useValue: modalRef },
          ...(providers || []),
        ],
        parent: this.injector,
      })
    );
    overlay.attach(cmpPortal);
    return modalRef;
  }
}
