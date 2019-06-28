import { TemplateRef } from '@angular/core';

export type ThyProgressTypes = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export interface ThyStackedValue {
    value: number;
    type?: string;
    color?: string;
    label?: string;
    tips?: string | TemplateRef<HTMLElement>;
}
