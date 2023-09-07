import { Dictionary } from 'ngx-tethys/types';

import { InjectionToken } from '@angular/core';
import { AbstractControl, FormControlName } from '@angular/forms';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

export type ThyFormGroupFooterAlign = 'left' | 'right' | 'center';

export declare type ThyValidateOn = 'submit' | 'blur' | 'change';

export declare type ThyFormValidationMessages = Dictionary<Dictionary<string>>;

/**
 * @order 20
 */
export interface ThyFormValidatorConfig {
    /**
     * 当值为 true 或不传时，执行默认逻辑，当为 false 时，不显示错误；值为 function 时，执行自定义函数处理逻辑，需要注入 THY_VALIDATOR_CONFIG 来使配置生效。
     */
    showElementError?: boolean | ((element: HTMLElement, errorMessages: string[]) => void);

    /**
     * 移除错误，一般和 showElementError 匹配使用；当值为 true 或不传时，执行默认逻辑，当为 false 时，不显示错误提示；值为 function 时，执行自定义函数处理逻辑，需要注入 THY_VALIDATOR_CONFIG 来使配置生效。
     */
    removeElementError?: boolean | ((element: HTMLElement) => void);

    /**
     * 每个字段的验证提示信息配置, validationMessages: {external_url: {required: '应用地址不能为空'}}
     */
    validationMessages?: ThyFormValidationMessages;

    /**
     * 表单验证触发方式; 支持change、submit、blur三种方式触发。默认submit。
     */
    validateOn?: ThyValidateOn;
}

export interface ThyFormValidatorGlobalConfig extends ThyFormValidatorConfig {
    globalValidationMessages?: Dictionary<string>;
}

export interface ThyFormConfig {
    layout?: ThyFormLayout;
    footerAlign?: ThyFormGroupFooterAlign;
}

export interface ThyControlValidationResult {
    valid: boolean;
    control: AbstractControl | FormControlName;
    element: HTMLElement;
}

export interface ThyValidateResult {
    valid: boolean;
    invalidControls: ThyControlValidationResult[];
    validControls: ThyControlValidationResult[];
}

export const THY_VALIDATOR_CONFIG = new InjectionToken<ThyFormValidatorGlobalConfig>('VALIDATION_CONFIG');

export const THY_FORM_CONFIG = new InjectionToken<ThyFormConfig>('THY_FORM_CONFIG');

export const THY_FORM_CONFIG_PROVIDER = {
    provide: THY_FORM_CONFIG,
    useValue: { layout: 'horizontal', footerAlign: 'left' }
};
