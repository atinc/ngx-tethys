import { Injectable } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { helpers } from '../util';
import {
    ThyFormValidatorLoader,
    ERROR_VALUE_REPLACE_REGEX
} from './form-validator-loader';
import { ThyFormValidatorConfig } from './form.class';
import { Dictionary } from '../typings';

@Injectable()
export class ThyFormValidatorService {
    private _ngForm: NgForm;

    private _formElement: HTMLElement;

    private _config: ThyFormValidatorConfig;

    public errors: string[] = [];

    // 记录所有元素的验证信息
    public validations: Dictionary<{
        hasError?: boolean;
        errorMessages?: string[];
    }> = {};

    private _getElement(name: string) {
        const element = this._formElement[name];
        if (element) {
            return element;
        } else {
            return this._formElement.querySelector(`[name='${name}']`);
        }
    }

    private _clearElementError(name: string) {
        if (this.validations[name] && this.validations[name].hasError) {
            this.validations[name].hasError = false;
            this.validations[name].errorMessages = [];
            this.thyFormValidateLoader.removeError(this._getElement(name));
        }
    }

    private _tryGetValidation(name: string) {
        if (!this.validations[name]) {
            this._initializeFormControlValidation(
                name,
                this._ngForm.controls[name]
            );
        }
        return this.validations[name];
    }

    private _addError(message: string) {
        this.errors.unshift(message);
    }

    private _clearErrors() {
        this.errors = [];
    }

    private _initializeFormControlValidation(
        name: string,
        control: AbstractControl
    ) {
        this.validations[name] = {
            hasError: false,
            errorMessages: []
        };
        control.valueChanges.subscribe(() => {
            this._clearElementError(name);
            this._clearErrors();
        });
    }

    private _restFormControlValidation(name: string) {
        const validation = this.validations[name];
        if (validation) {
            validation.hasError = false;
            validation.errorMessages = [];
        }
    }

    private _formatValidationMessage(name: string, message: string) {
        const control = this._ngForm.controls[name];
        if (control) {
            return message.replace(
                ERROR_VALUE_REPLACE_REGEX,
                (tag, key) => {
                    if (key) {
                        return (
                            control.errors[key][key] ||
                            control.errors[key].requiredLength
                        );
                    }
                }
            );
        } else {
            return message;
        }
    }

    private _getValidationMessage(name: string, validationError: string) {
        let message = null;
        if (
            this._config &&
            this._config.validationMessages &&
            this._config.validationMessages[name] &&
            this._config.validationMessages[name][validationError]
        ) {
            message = this._config.validationMessages[name][validationError];
        } else {
            message = this.thyFormValidateLoader.getErrorMessage(
                name,
                validationError
            );
        }
        return this._formatValidationMessage(name, message);
    }

    private _getValidationMessages(
        name: string,
        validationErrors: ValidationErrors
    ) {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(
                    this._getValidationMessage(name, validationError)
                );
            }
        }
        return messages;
    }

    _setControlValidationError(name: string, errorMessages: string[]) {
        const validation = this._tryGetValidation(name);
        validation.errorMessages = errorMessages;
        validation.hasError = true;
        this.thyFormValidateLoader.showError(
            this._getElement(name),
            errorMessages
        );
    }

    constructor(private thyFormValidateLoader: ThyFormValidatorLoader) {}

    initialize(ngForm: NgForm, formElement: HTMLElement) {
        this._ngForm = ngForm;
        this._formElement = formElement;
    }

    setValidatorConfig(config: ThyFormValidatorConfig) {
        this._config = config;
    }

    validateControl(name: string) {
        this._clearElementError(name);
        const control = this._ngForm.controls[name];
        if (control && control.invalid) {
            const errorMessages = this._getValidationMessages(
                name,
                control.errors
            );
            this._setControlValidationError(name, errorMessages);
        }
    }

    validateControls() {
        // 主要是 无法检测到 ngForm 的 controls 的变化，或者是我没有找到
        // 验证的时候循环 ngForm 的 controls 验证
        // 发现没有 validation 初始化一个，已经存在不会重新初始化，保存缓存数据
        for (const name in this._ngForm.controls) {
            if (this._ngForm.controls.hasOwnProperty(name)) {
                this._tryGetValidation(name);
                this.validateControl(name);
            }
        }
        // 移除已经不存在的 validation
        const names = Object.keys(this.validations);
        names.forEach(name => {
            if (!this._ngForm.controls[name]) {
                delete this.validations[name];
            }
        });
    }

    addError(message: string) {
        this._addError(message);
    }

    validate($event?: Event): boolean {
        this._ngForm.onSubmit($event);
        this.validateControls();
        return this._ngForm.valid;
    }

    reset() {
        this._ngForm.reset();
        for (const name in this.validations) {
            if (this.validations.hasOwnProperty(name)) {
                this._restFormControlValidation(name);
                this._clearElementError(name);
            }
        }
    }

    setElementErrorMessage(name: string, message: string) {
        this._clearElementError(name);
        this._setControlValidationError(name, [message]);
    }
}
