import { TemplateRef } from '@angular/core';

import { SafeAny } from 'ngx-tethys/types';

export const THY_PROGRESS_PRESET_COLORS = ['primary', 'success', 'info', 'warning', 'danger'] as const;

export type ThyProgressColor = (typeof THY_PROGRESS_PRESET_COLORS)[number];

/** @deprecated use ThyProgressColor */
export type ThyProgressType = ThyProgressColor;

export function isProgressPresetColor(color: string | undefined): color is ThyProgressColor {
    return !!color && (THY_PROGRESS_PRESET_COLORS as readonly string[]).includes(color);
}

export type ThyProgressShapeType = 'strip' | 'circle';
export interface ThyProgressStackedValue {
    value: number;
    type?: ThyProgressColor;
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
}

export type ThyProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';
