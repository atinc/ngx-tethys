import { ElementRef, InjectionToken } from '@angular/core';
import { ThyPlacement, ThyAbstractOverlayConfig } from 'ngx-tethys/core';
import { ScrollStrategy } from '@angular/cdk/overlay';

export class ThyAutocompleteConfig<TData = any> extends ThyAbstractOverlayConfig<TData> {
    /** Origin Element, for overlay flexible connected to */
    origin: ElementRef<any> | HTMLElement;

    /** Placement be relative to origin, topCenter, topLeft, topRight, bottomCenter, bottomLeft, bottomRight ...*/
    placement?: ThyPlacement;

    /** Click inside can been close */
    insideClosable?: boolean;

    /** Offset be relative to origin, default is 4*/
    offset?: number;

    /** Manually close it, default rules is which auto close last autocomplete when open a new unless set manualClosure as true */
    manualClosure?: boolean;

    /** Origin active class when autocomplete is opened */
    originActiveClass?: string | string[];

    /**
     * 滚动策略
     */
    scrollStrategy?: ScrollStrategy;

    /** Click outside can been close */
    outsideClosable?: boolean;
}

export const THY_AUTOCOMPLETE_DEFAULT_CONFIG = new InjectionToken<ThyAutocompleteConfig>('thy-autocomplete-default-config');

export const THY_AUTOCOMPLETE_DEFAULT_CONFIG_PROVIDER = {
    provide: THY_AUTOCOMPLETE_DEFAULT_CONFIG,
    useValue: {
        hasBackdrop: false,
        panelClass: '',
        closeOnNavigation: true,
        insideClosable: true,
        manualClosure: false,
        outsideClosable: true,
        originActiveClass: 'thy-autocomplete-origin-active'
    }
};
