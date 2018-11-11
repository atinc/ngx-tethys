
import { Dictionary } from '../typings';
import { InjectionToken } from '@angular/core';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

export declare type ThyFormValidationMessages = Dictionary<Dictionary<string>>;

export interface ThyFormValidatorConfig {
    showElementError?: boolean | ((element: HTMLElement, errorMessages: string[]) => void);
    removeElementError?: boolean | ((element: HTMLElement) => void);
    globalValidationMessages?: Dictionary<string>;
    validationMessages?: ThyFormValidationMessages;
}

export const THY_VALIDATOR_CONFIG = new InjectionToken<ThyFormValidatorConfig>('VALIDATION_CONFIG');

