import { InjectionToken } from '@angular/core';
export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';
export type ThyFormGroupFooterAlign = 'left' | 'right' | 'center';
export interface ThyFormConfig {
    layout?: ThyFormLayout;
    footerAlign?: ThyFormGroupFooterAlign;
}

export const THY_FORM_CONFIG = new InjectionToken<ThyFormConfig>('THY_FORM_CONFIG');

export const THY_FORM_CONFIG_PROVIDER = {
    provide: THY_FORM_CONFIG,
    useValue: { layout: 'horizontal', footerAlign: 'left' }
};
