import { ThyPlacement, ThyAbstractOverlayConfig } from 'ngx-tethys/core';

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, InjectionToken } from '@angular/core';

export class ThyPopoverConfig<TData = any> extends ThyAbstractOverlayConfig<TData> {
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
    outsideClosable?: boolean;
}

export const THY_POPOVER_DEFAULT_CONFIG = new InjectionToken<ThyPopoverConfig>('thy-popover-default-config');

export const THY_POPOVER_DEFAULT_CONFIG_VALUE = {
    hasBackdrop: true,
    backdropClass: 'thy-popover-backdrop',
    panelClass: '',
    offset: 4,
    backdropClosable: true,
    closeOnNavigation: true,
    placement: 'bottom' as ThyPlacement,
    insideClosable: false,
    manualClosure: false,
    originActiveClass: 'thy-popover-origin-active'
};

export const THY_POPOVER_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_POPOVER_DEFAULT_CONFIG,
    useValue: THY_POPOVER_DEFAULT_CONFIG_VALUE
};

export const THY_POPOVER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('thy-popover-scroll-strategy');

export const THY_POPOVER_SCROLL_STRATEGY_FACTORY = (overlay: Overlay) => {
    return () => overlay.scrollStrategies.block();
};

export const THY_POPOVER_SCROLL_STRATEGY_PROVIDER = {
    provide: THY_POPOVER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: THY_POPOVER_SCROLL_STRATEGY_FACTORY
};
