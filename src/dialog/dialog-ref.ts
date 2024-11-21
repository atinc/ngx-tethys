import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { ThyDialogContainer } from './dialog-container.component';
import { ThyDialogConfig } from './dialog.config';
import { dialogAbstractOverlayOptions } from './dialog.options';

/**
 * @publicApi
 * @order 30
 */
export interface ThyAbstractDialog {
    toTop(id: string): void;
}

export abstract class ThyDialogRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThyDialogContainer, TResult> {}

export class ThyInternalDialogRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyDialogContainer, TResult> {
    abstractDialog: ThyAbstractDialog;

    constructor(
        overlayRef: OverlayRef,
        containerInstance: ThyDialogContainer,
        config: ThyDialogConfig<T>,
        abstractDialog: ThyAbstractDialog
    ) {
        super(dialogAbstractOverlayOptions, overlayRef, containerInstance, config);
        this.abstractDialog = abstractDialog;
    }

    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position?: ThyAbstractOverlayPosition): this {
        this.updateGlobalPosition(position);
        return this;
    }

    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSizeAndPosition(width: string = '', height: string = '', position?: ThyAbstractOverlayPosition): this {
        (this.getPositionStrategy() as GlobalPositionStrategy).width(width).height(height);
        this.updatePosition(position);
        return this;
    }

    /**
     * Update dialog to top
     */
    toTop() {
        this.abstractDialog.toTop(this.id);
    }
}
