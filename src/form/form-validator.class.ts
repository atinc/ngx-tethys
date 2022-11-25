// import { InjectionToken } from '@angular/core';
// import { ValidationFeedbackStrategy } from './strategies';

// export declare type NgxValidationMessages = Record<string, Record<string, string>>;
import { Dictionary } from 'ngx-tethys/types';
import { InjectionToken } from '@angular/core';

export declare type ThyValidateOn = 'submit' | 'blur' | 'change';

export declare type ThyFormValidationMessages = Dictionary<Dictionary<string>>;

export interface ThyFormValidatorConfig {
    showElementError?: boolean | ((element: HTMLElement, errorMessages: string[]) => void);
    removeElementError?: boolean | ((element: HTMLElement) => void);
    validationMessages?: ThyFormValidationMessages;
    validateOn?: ThyValidateOn;
}

export interface ThyFormValidatorGlobalConfig extends ThyFormValidatorConfig {
    globalValidationMessages?: Dictionary<string>;
}

export const THY_VALIDATOR_CONFIG = new InjectionToken<ThyFormValidatorGlobalConfig>('VALIDATION_CONFIG');

// export interface NgxValidatorConfig {
//     validationFeedbackStrategy?: ValidationFeedbackStrategy;
//     validationMessages?: NgxValidationMessages;
//     validateOn?: NgxValidateOn;
// }
// export interface NgxValidatorGlobalConfig extends NgxValidatorConfig {
//     globalValidationMessages?: Record<string, string>;
// }

// export const NGX_VALIDATOR_CONFIG = new InjectionToken<NgxValidatorGlobalConfig>('NGX_VALIDATION_CONFIG');

// export const DEFAULT_GLOBAL_VALIDATION_MESSAGES = {
//     required: '该选项不能为空',
//     maxlength: '该选项输入值长度不能大于{requiredLength}',
//     minlength: '该选项输入值长度不能小于{requiredLength}',
//     ngxUniqueCheck: '输入值已经存在，请重新输入',
//     email: '输入邮件的格式不正确',
//     repeat: '两次输入不一致',
//     pattern: '该选项输入格式不正确',
//     number: '必须输入数字',
//     url: '输入URL格式不正确',
//     max: '该选项输入值不能大于{max}',
//     min: '该选项输入值不能小于{min}'
// };
