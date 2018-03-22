import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class PopBoxOptions {

    target?: any;
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
    /**
     * Placement of a pop-box. 
     * Default: "bottom left". 
     * Accepts: 
     * "top", "top left", "top right", 
     * "bottom", "bottom left", "bottom right", 
     * "left", "left top", "left bottom" 
     * "right", "right top", "right bottom".
     */
    placement?: string;

    /**
     * 
     */
    visibleArrow?: boolean;

    /**
     * Close PopBox on outside click
     */
    outsideClick?: boolean;
}

export const popBoxConfigDefaults: PopBoxOptions = {
    placement: 'bottom left',
    visibleArrow: false,
    keyboard: true,
    outsideClick: true
}