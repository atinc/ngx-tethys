import { Injectable, ViewRef } from '@angular/core';

@Injectable()
export class PopBoxOptions {

    target?: ViewRef;
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard?: boolean;

    focus?: boolean;
    /**
     * Shows the modal when initialized.
     */
    show?: boolean;
    /**
     * Css class for opened modal
     */
    class?: string;
    /**
     * Toggle animation
     */
    animated?: boolean;
    /**
     * Modal data
     */
    initialState?: Object;
}
