import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayPosition, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { ThyDialogContainer } from './dialog-container.component';
import { ThyDialogConfig } from './dialog.config';
import { dialogAbstractOverlayOptions } from './dialog.options';
import { ThyDialog } from './dialog.service';

/**
 * @publicApi
 * @order 30
 */
export abstract class ThyDialogRef<T, TResult = unknown> extends ThyAbstractOverlayRef<T, ThyDialogContainer, TResult> {}

export class ThyInternalDialogRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyDialogContainer, TResult> {
    private thyDialog: ThyDialog;

    constructor(overlayRef: OverlayRef, containerInstance: ThyDialogContainer, config: ThyDialogConfig<T>, service: ThyDialog) {
        super(dialogAbstractOverlayOptions, overlayRef, containerInstance, config);
        this.thyDialog = service;
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
        this.thyDialog.toTop(this.id);
    }
}
