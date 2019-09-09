import { Direction } from '@angular/cdk/bidi';
import { ViewContainerRef } from '@angular/core';

export interface ThyUpperOverlayPosition {
    /** Override for the overlay's top position. */
    top?: string;

    /** Override for the overlay's bottom position. */
    bottom?: string;

    /** Override for the overlay's left position. */
    left?: string;

    /** Override for the overlay's right position. */
    right?: string;
}

export class ThyUpperOverlayConfig<TData = any> {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;

    /** Custom class for the overlay pane. */
    panelClass?: string | string[] = '';

    /** Whether the dialog has a backdrop. */
    hasBackdrop? = true;

    /** Custom class for the backdrop, */
    backdropClass? = '';

    /** Whether the user can use escape or clicking on the backdrop to close the overlay. */
    backdropClosable? = true;

    /** Width of the dialog. */
    width? = '';

    /** Height of the dialog. */
    height? = '';

    /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;

    /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;

    /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
    maxWidth?: number | string;

    /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;

    /** Position overrides. */
    position?: ThyUpperOverlayPosition;

    /** Data being injected into the child component. */
    initialState?: TData | null = null;

    /** Layout direction for the overlay's content. */
    direction?: Direction;

    /** ID of the element that describes the dialog. */
    ariaDescribedBy?: string | null = null;

    /** Aria label to assign to the dialog element */
    ariaLabel?: string | null = null;

    /** Whether the dialog should focus the first focusable element on open. */
    autoFocus? = true;

    /**
     * Whether the dialog should restore focus to the
     * previously-focused element, after it's closed.
     */
    restoreFocus? = true;

    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    closeOnNavigation? = true;
}

export interface ThyUpperOverlayOptions {
    /** component name, e.g. dialog | popover | slide */
    name: string;
    /** Whether enable animation */
    animationEnabled: boolean;
    /** Whether dispose cdk overlay ref when close upper overlay */
    disposeWhenClose: boolean;
}
