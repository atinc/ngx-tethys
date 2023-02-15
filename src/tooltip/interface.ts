import { TemplateRef } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

export type ThyTooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

export type ThyTooltipVisibility = 'initial' | 'visible' | 'hidden';

export type ThyTooltipContent = string | TemplateRef<SafeAny>;

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
