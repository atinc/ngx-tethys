import { OverlayRef } from '@angular/cdk/overlay';
import { ThyAutocompleteContainerComponent } from './autocomplete-container.component';
import { ThyUpperOverlayRef, ThyInternalUpperOverlayRef, ThyUpperOverlayPosition } from 'ngx-tethys/core';
import { autocompleteUpperOverlayOptions } from './autocomplete.options';
import { ThyAutocompleteConfig } from './autocomplete.config';

export abstract class ThyAutocompleteRef<T, TResult = any> extends ThyUpperOverlayRef<T, ThyAutocompleteContainerComponent, TResult> {}

export class ThyInternalAutocompleteRef<T, TResult = any> extends ThyInternalUpperOverlayRef<T, ThyAutocompleteContainerComponent, TResult>
    implements ThyAutocompleteRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyAutocompleteContainerComponent, config: ThyAutocompleteConfig) {
        super(autocompleteUpperOverlayOptions, overlayRef, containerInstance, config);
    }

    /**
     * Updates the autocomplete's position.
     * @param position New autocomplete position.
     */
    updatePosition(): this {
        this.overlayRef.updatePosition();
        return this;
    }
}
