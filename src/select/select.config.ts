import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { ThyDropdownWidthMode } from './custom-select/custom-select.component';

export const THY_SELECT_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('thy-select-scroll-strategy');

export const THY_SELECT_SCROLL_STRATEGY_FACTORY = (overlay: Overlay) => {
    return () => overlay.scrollStrategies.reposition();
};

export const THY_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: THY_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: THY_SELECT_SCROLL_STRATEGY_FACTORY
};

export interface ThySelectConfig {
    thyDropdownWidthMode: ThyDropdownWidthMode;
}

export const DEFAULT_SELECT_CONFIG: ThySelectConfig = {
    thyDropdownWidthMode: 'match-select'
};

export const THY_SELECT_CONFIG = new InjectionToken<ThySelectConfig>('thy-select-config');

export const THY_SELECT_CONFIG_PROVIDER = {
    provide: THY_SELECT_CONFIG,
    useValue: DEFAULT_SELECT_CONFIG
};
