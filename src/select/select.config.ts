import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export const THY_SELECT_SCROLL_STRATEGY = new InjectionToken<ScrollStrategy>('thy-select-scroll-strategy');

const THY_POPOVER_SCROLL_STRATEGY_FACTORY = (overlay: Overlay) => {
    return () => overlay.scrollStrategies.reposition();
};

export const THY_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: THY_SELECT_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: THY_POPOVER_SCROLL_STRATEGY_FACTORY
};
