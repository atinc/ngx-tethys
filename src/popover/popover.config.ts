import { ElementRef, ViewContainerRef, InjectionToken } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ThyPlacement } from '../core/overlay';

export interface PopoverPosition {
    /** Override for the popover's top position. */
    top?: string;

    /** Override for the popover's bottom position. */
    bottom?: string;

    /** Override for the popover's left position. */
    left?: string;

    /** Override for the popover's right position. */
    right?: string;
}

export class ThyPopoverConfig<TData = any> {
    /** Origin Element, for overlay flexible connected to */
    origin: ElementRef<any> | HTMLElement;
    viewContainerRef?: ViewContainerRef;
    initialState?: TData | null;
    placement?: ThyPlacement;
    /** Whether has backdrop */
    hasBackdrop?: boolean;
    /** Backdrop can been close */
    backdropClosable?: boolean;
    /** Backdrop class*/
    backdropClass?: string | string[];
    closeOnNavigation?: boolean;
    direction?: Directionality;
    position?: PopoverPosition;
    offset?: number;
    /** Min-width of the dialog. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;

    /** Min-height of the dialog. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;

    /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
    maxWidth?: number | string;

    /** Max-height of the dialog. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;
}

export const THY_POPOVER_DEFAULT_CONFIG = new InjectionToken<ThyPopoverConfig>('thy-popover-default-config');

export const THY_POPOVER_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_POPOVER_DEFAULT_CONFIG,
    useValue: {
        hasBackdrop: true,
        backdropClass: 'thy-popover-backdrop',
        panelClass: '',
        offset: 4,
        backdropClosable: true,
        closeOnNavigation: true,
        placement: 'bottom'
    }
};
