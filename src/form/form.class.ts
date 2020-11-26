import { Dictionary } from 'ngx-tethys/typings';
import { InjectionToken } from '@angular/core';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

export type ThyFormGroupFooterAlign = 'left' | 'right' | 'center';

export declare type ThyFormValidationMessages = Dictionary<Dictionary<string>>;

export interface ThyFormValidatorConfig {
    showElementError?: boolean | ((element: HTMLElement, errorMessages: string[]) => void);
    removeElementError?: boolean | ((element: HTMLElement) => void);
    validationMessages?: ThyFormValidationMessages;
}
export interface ThyFormValidatorGlobalConfig extends ThyFormValidatorConfig {
    globalValidationMessages?: Dictionary<string>;
}

export interface ThyFormConfig {
    layout?: ThyFormLayout;
    footerAlign?: ThyFormGroupFooterAlign;
}

export const THY_VALIDATOR_CONFIG = new InjectionToken<ThyFormValidatorGlobalConfig>('VALIDATION_CONFIG');

export const THY_FORM_CONFIG = new InjectionToken<ThyFormConfig>('THY_FORM_CONFIG');

export const THY_FORM_CONFIG_PROVIDER = {
    provide: THY_FORM_CONFIG,
    useValue: { layout: 'horizontal', footerAlign: 'left' }
};
