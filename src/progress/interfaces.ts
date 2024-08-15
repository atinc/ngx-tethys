import { TemplateRef } from '@angular/core';

import { SafeAny } from 'ngx-tethys/types';

export type ThyProgressType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export type ThyProgressShapeType = 'strip' | 'circle';
export interface ThyProgressStackedValue {
    value: number;
    type?: ThyProgressType;
    color?: string;
    label?: string;
    tips?: string | TemplateRef<unknown>;
}

export interface ThyProgressPathStyle {
    [property: string]: SafeAny;
}

export interface ThyProgressCirclePath {
    stroke: string | null;
    strokePathStyle: ThyProgressPathStyle;
    className: string;
    value: number;
}

export type ThyProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';

/**
 * @deprecated please use ThyProgressStackedValue
 */
export type ThyStackedValue = ThyProgressStackedValue;
