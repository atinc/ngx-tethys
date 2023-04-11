import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayRef } from 'ngx-tethys/core';

import { OverlayRef } from '@angular/cdk/overlay';

import { ThyAutocompleteContainerComponent } from './autocomplete-container.component';
import { ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

export abstract class ThyAutocompleteRef<T, TResult = any> extends ThyAbstractOverlayRef<T, ThyAutocompleteContainerComponent, TResult> {}

export class ThyInternalAutocompleteRef<T, TResult = any>
    extends ThyAbstractInternalOverlayRef<T, ThyAutocompleteContainerComponent, TResult>
    implements ThyAutocompleteRef<T, TResult>
{
    constructor(overlayRef: OverlayRef, containerInstance: ThyAutocompleteContainerComponent, config: ThyAutocompleteConfig) {
        super(autocompleteAbstractOverlayOptions, overlayRef, containerInstance, config);
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
