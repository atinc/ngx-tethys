import { TemplateRef } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

export type ThyTooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

export type ThyTooltipVisibility = 'initial' | 'visible' | 'hidden';

export type ThyTooltipContent = string | TemplateRef<SafeAny>;