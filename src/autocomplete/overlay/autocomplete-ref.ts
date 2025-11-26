import { ThyAbstractInternalOverlayRef, ThyAbstractOverlayOptions, ThyAbstractOverlayRef } from 'ngx-tethys/core';
import { ThyAutocompleteContainer } from './autocomplete-container.component';
import { ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

export abstract class ThyAutocompleteRef<T, TResult = any> extends ThyAbstractOverlayRef<T, ThyAutocompleteContainer, TResult> {}

export class ThyInternalAutocompleteRef<T, TResult = any>
    extends ThyAbstractInternalOverlayRef<T, ThyAutocompleteContainer, TResult, ThyAutocompleteConfig>
    implements ThyAutocompleteRef<T, TResult>
{
    constructor() {
        super();
    }

    protected get options(): ThyAbstractOverlayOptions {
        return autocompleteAbstractOverlayOptions;
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
