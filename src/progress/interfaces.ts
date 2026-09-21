import { TemplateRef } from '@angular/core';

import { SafeAny } from 'ngx-tethys/types';

export type ThyProgressColor = 'primary' | 'success' | 'info' | 'warning' | 'danger';

/** @deprecated use ThyProgressColor */
export type ThyProgressType = ThyProgressColor;

export type ThyProgressShapeType = 'strip' | 'circle';
export interface ThyProgressStackedValue {
    value: number;
    color?: ThyProgressColor | string;
    label?: string;
    tips?: string | TemplateRef<unknown>;
}

export interface ThyProgressPathStyle {
    [property: string]: SafeAny;
}

export interface ThyProgressCirclePath {
    stroke: string | null;
    strokePathStyle: ThyProgressPathStyle;
}

export type ThyProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';
