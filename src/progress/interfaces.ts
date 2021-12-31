import { TemplateRef } from '@angular/core';

export type ThyProgressType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export interface ThyProgressStackedValue {
    value: number;
    type?: ThyProgressType;
    color?: string;
    label?: string;
    tips?: string | TemplateRef<unknown>;
}

/**
 * @deprecated please use ThyProgressStackedValue
 */
export type ThyStackedValue = ThyProgressStackedValue;
