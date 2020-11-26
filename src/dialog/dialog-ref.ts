import { ESCAPE } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ThyDialogConfig } from './dialog.config';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyUpperOverlayRef, ThyInternalUpperOverlayRef, ThyUpperOverlayPosition } from 'ngx-tethys/core';
import { dialogUpperOverlayOptions } from './dialog.options';

export abstract class ThyDialogRef<T, TResult = any> extends ThyUpperOverlayRef<T, ThyDialogContainerComponent, TResult> {}

export class ThyInternalDialogRef<T, TResult = any> extends ThyInternalUpperOverlayRef<T, ThyDialogContainerComponent, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyDialogContainerComponent, config: ThyDialogConfig<T>) {
        super(dialogUpperOverlayOptions, overlayRef, containerInstance, config);
    }

    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position?: ThyUpperOverlayPosition): this {
        this.updateGlobalPosition(position);
        return this;
    }

    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSizeAndPosition(width: string = '', height: string = '', position?: ThyUpperOverlayPosition): this {
        (this.getPositionStrategy() as GlobalPositionStrategy).width(width).height(height);
        this.updatePosition(position);
        return this;
    }
}
