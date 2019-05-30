export type ThyTooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

export type ThyTooltipPlacement = 'bottom' | 'top' | 'left' | 'right';

export type ThyTooltipVisibility = 'initial' | 'visible' | 'hidden';

export interface ThyTooltipOptions {
    showDelay: number;
    hideDelay: number;
    touchendHideDelay: number;
    // position?: ThyTooltipPosition;
}

export const DEFAULT_TOOLTIP_OPTIONS: ThyTooltipOptions = {
    showDelay: 200,
    hideDelay: 100,
    touchendHideDelay: 1500
};
