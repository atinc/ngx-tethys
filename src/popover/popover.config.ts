import { ElementRef, ViewContainerRef, InjectionToken } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ThyPlacement, ThyUpperOverlayConfig } from '../core/overlay';
import { ScrollStrategy, PositionStrategy } from '@angular/cdk/overlay';

export class ThyPopoverConfig<TData = any> extends ThyUpperOverlayConfig<TData> {
    /** Origin Element, for overlay flexible connected to */
    origin: ElementRef<any> | HTMLElement;

    /** Origin point, default use origin's boundingClientRect*/
    originPosition?: {
        x: number;
        y: number;
    } & { width?: number; height?: number };

    /** Placement be relative to origin, topCenter, topLeft, topRight, bottomCenter, bottomLeft, bottomRight ...*/
    placement?: ThyPlacement;

    /** Click inside can been close */
    insideClosable?: boolean;

    /** Offset be relative to origin, default is 4*/
    offset?: number;

    /** Manually close it, default rules is which auto close last popover when open a new unless set manualClosure as true */
    manualClosure?: boolean;

    /** Origin active class when popover is opened */
    originActiveClass?: string | string[];

    /**
     * 滚动策略
     */
    scrollStrategy?: ScrollStrategy;

    /** Click outside can been close */
    outsetClosable?: boolean;
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
        placement: 'bottom',
        insideClosable: false,
        manualClosure: false,
        originActiveClass: 'thy-popover-origin-active'
    }
};
