import { Dictionary } from 'ngx-tethys/types';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';

import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormControlName, FormGroupDirective, NgControl, NgForm, ValidationErrors } from '@angular/forms';

import { ERROR_VALUE_REPLACE_REGEX, ThyFormValidatorLoader } from './form-validator-loader';
import { ThyFormValidatorConfig, ThyValidateOn, ThyValidateResult } from './form.class';

/**
 * @private
 */
@Injectable()
export class ThyFormValidatorService implements OnDestroy {
    private _ngForm: NgForm | FormGroupDirective;

    private _formElement: HTMLFormElement;

    private _config: ThyFormValidatorConfig;

    public errors: string[] = [];

    private _controls: NgControl[] = [];

    // 记录所有元素的验证信息
    public validations: Dictionary<{
        hasError?: boolean;
        errorMessages?: string[];
    }> = {};

    private _destroy$ = new Subject<void>();

    private _getElement(name: string) {
        const element = this._formElement.elements[name];
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
        const controls = this._getControls();
        if (!this.validations[name]) {
            this._initializeFormControlValidation(name, controls[name] as any);
        }
        return this.validations[name];
    }

    private _addError(message: string) {
        this.errors.unshift(message);
    }

    private _clearErrors() {
        this.errors = [];
    }

    private _setControlValidateByChange(control: NgControl) {
        control.valueChanges
            .pipe(
                debounceTime(100),
                distinctUntilChanged(),
                filter(item => {
                    return item;
                }),
                switchMap(item => {
                    this.validateControl(control.name as string);
                    return of([]);
                })
            )
            .subscribe();
    }

    private _setControlValidateByBlur(control: NgControl) {
        const element: HTMLElement = this._getElement(control.name as string);
        if (element) {
            // 继承了 AbstractControlValueAccessor 的自定义 Accessor，通过 __onBlurValidation 控制触发验证函数
            if (control.valueAccessor['__onBlurValidation']) {
                control.valueAccessor['__onBlurValidation'] = () => {
                    this.validateControl(control.name as string);
                };
            } else {
                element.onblur = (event: FocusEvent) => {
                    this.validateControl(control.name as string);
                };
            }
        }
    }

    private _initializeFormControlValidation(name: string, control: AbstractControl | FormControlName | NgControl) {
        this.validations[name] = {
            hasError: false,
            errorMessages: []
        };
        if (this._getValidateOn() === 'change') {
            this._setControlValidateByChange(control as NgControl);
        } else {
            if (this._getValidateOn() === 'blur') {
                this._setControlValidateByBlur(control as NgControl);
            }

            control.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(item => {
                this._clearElementError(name);
                this._clearErrors();
            });
        }
    }

    private _restFormControlValidation(name: string) {
        const validation = this.validations[name];
        if (validation) {
            validation.hasError = false;
            validation.errorMessages = [];
        }
    }

    private _formatValidationMessage(name: string, message: string) {
        const controls = this._getControls();
        const control = controls[name];
        if (control) {
            return message.replace(ERROR_VALUE_REPLACE_REGEX, (tag, key) => {
                if (key) {
                    return isUndefinedOrNull(control.errors[key][key]) ? control.errors[key].requiredLength : control.errors[key][key];
                }
            });
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
            message = this.thyFormValidateLoader.getErrorMessage(name, validationError);
        }
        return this._formatValidationMessage(name, message);
    }

    private _getValidationMessages(name: string, validationErrors: ValidationErrors) {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this._getValidationMessage(name, validationError));
            }
        }
        return messages;
    }

    private _setControlValidationError(name: string, errorMessages: string[]) {
        const validation = this._tryGetValidation(name);
        validation.errorMessages = errorMessages;
        validation.hasError = true;
        this.thyFormValidateLoader.showError(this._getElement(name), errorMessages);
    }

    private _getValidateOn(): ThyValidateOn {
        return (this._config && this._config.validateOn) || this.thyFormValidateLoader.validateOn;
    }

    constructor(private thyFormValidateLoader: ThyFormValidatorLoader) {}

    initialize(ngForm: NgForm | FormGroupDirective, formElement: HTMLFormElement) {
        this._ngForm = ngForm;
        this._formElement = formElement;
    }

    initializeFormControlsValidation(controls: NgControl[]) {
        if (this._getValidateOn() !== 'submit') {
            (controls || []).forEach((control: NgControl) => {
                if (!this._controls.find(item => item.name === control.name)) {
                    this._initializeFormControlValidation(control.name as string, control);
                }
            });
            this._controls = controls;
        }
    }

    setValidatorConfig(config: ThyFormValidatorConfig) {
        this._config = config;
    }

    private _getControls() {
        if (this._ngForm instanceof NgForm) {
            return (this._ngForm as NgForm).controls;
        } else if (this._ngForm instanceof FormGroupDirective) {
            const controls = {};
            (this._ngForm as FormGroupDirective).directives.forEach(directive => {
                controls[directive.name] = directive;
            });
            return controls;
        }
    }

    private _getControlByName(name: string): AbstractControl | FormControlName {
        const controls = this._getControls();
        return controls[name];
    }

    validateControl(name: string) {
        this._clearElementError(name);
        const control = this._getControlByName(name);
        if (control && control.invalid) {
            const errorMessages = this._getValidationMessages(name, control.errors);
            this._setControlValidationError(name, errorMessages);
        }
        return {
            valid: control.valid,
            control: control,
            element: this._getElement(name)
        };
    }

    validateControls() {
        // 主要是 无法检测到 ngForm 的 controls 的变化，或者是我没有找到
        // 验证的时候循环 ngForm 的 controls 验证
        // 发现没有 validation 初始化一个，已经存在不会重新初始化，保存缓存数据
        const results = [];
        const controls = this._getControls();
        for (const name in controls) {
            if (controls.hasOwnProperty(name)) {
                this._tryGetValidation(name);
                const result = this.validateControl(name);
                results.push(result);
            }
        }
        // 移除已经不存在的 validation
        const names = Object.keys(this.validations);
        names.forEach(name => {
            if (!controls[name]) {
                delete this.validations[name];
            }
        });
        return results;
    }

    addError(message: string) {
        this._addError(message);
    }

    validate($event?: Event, returnDetail: boolean = false): boolean | ThyValidateResult {
        this._ngForm.onSubmit($event);
        const results = this.validateControls();
        return returnDetail
            ? {
                  valid: this._ngForm.valid,
                  invalidControls: results.filter(res => !res.valid),
                  validControls: results.filter(res => res.valid)
              }
            : this._ngForm.valid;
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

    ngOnDestroy(): void {
        this._destroy$.next();
    }
}
