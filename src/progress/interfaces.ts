import { TemplateRef } from '@angular/core';

import { SafeAny } from 'ngx-tethys/types';

export type ThyProgressColor = 'primary' | 'success' | 'info' | 'warning' | 'danger';

/** @deprecated use ThyProgressColor, will be removed in v23 */
export type ThyProgressType = ThyProgressColor;

export type ThyProgressShape = 'strip' | 'circle';

/** @deprecated use ThyProgressShape, will be removed in v23 */
export type ThyProgressShapeType = ThyProgressShape;

export interface ThyProgressStackedValue {
    value: number;
    color?: ThyProgressColor | string;
    /** @deprecated use color, will be removed in v23 */
    type?: ThyProgressColor;
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

export type ThyProgressGapPosition = 'top' | 'bottom' | 'left' | 'right';

/** @deprecated use ThyProgressGapPosition, will be removed in v23 */
export type ThyProgressGapPositionType = ThyProgressGapPosition;
