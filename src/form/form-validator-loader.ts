import { Dictionary } from 'ngx-tethys/types';
import { helpers } from 'ngx-tethys/util';

import { Injectable, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { THY_VALIDATOR_CONFIG, ThyFormValidationMessages, ThyFormValidatorGlobalConfig } from './form.class';

export const ERROR_VALUE_REPLACE_REGEX = /\{(.+?)\}/g;

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

const defaultValidatorConfig: ThyFormValidatorGlobalConfig = {
    showElementError: true,
    removeElementError: true,
    validationMessages: {}
};

const globalValidationMessages = {
    required: '该选项不能为空',
    maxlength: '该选项输入值长度不能大于{maxlength}',
    minlength: '该选项输入值长度不能小于{minlength}',
    thyUniqueCheck: '输入值已经存在，请重新输入',
    email: '输入邮件的格式不正确',
    confirm: '两次输入不一致',
    pattern: '该选项输入格式不正确',
    number: '必须输入数字',
    url: '输入URL格式不正确',
    max: '该选项输入值不能大于{max}',
    min: '该选项输入值不能小于{min}'
};

/**
 * @private
 */
@Injectable()
export class ThyFormValidatorLoader {
    private config: ThyFormValidatorGlobalConfig;

    private getDefaultValidationMessage(key: string) {
        if (this.config.globalValidationMessages && this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        } else {
            return globalValidationMessages[key];
        }
    }
    constructor() {
        const config = inject(THY_VALIDATOR_CONFIG, { optional: true })!;

        this.config = Object.assign({}, defaultValidatorConfig, config);
    }

    get validationMessages() {
        return this.config.validationMessages;
    }

    get validateOn() {
        if (!this.config?.validateOn) {
            this.config.validateOn = 'submit';
        }
        return this.config.validateOn;
    }

    isElementInInputGroup(element: HTMLElement) {
        return !!(element?.parentElement?.tagName.toUpperCase() === 'THY-INPUT-GROUP');
    }

    getErrorMessage(name: string, key: string): string {
        if (this.validationMessages[name] && this.validationMessages[name][key]) {
            return this.validationMessages[name][key];
        } else {
            return this.getDefaultValidationMessage(key);
        }
    }

    getErrorMessages(name: string, validationErrors: ValidationErrors): string[] {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this.getErrorMessage(name, validationError));
            }
        }
        return messages;
    }

    defaultShowError(element: HTMLElement, errorMessages: string[]) {
        if (element && element.parentElement) {
            const documentFrag = document.createDocumentFragment();
            const divNode = document.createElement('DIV');
            const textNode = document.createTextNode(errorMessages[0]);
            divNode.appendChild(textNode);
            divNode.setAttribute('class', INVALID_FEEDBACK_CLASS);
            documentFrag.appendChild(divNode);
            element.parentElement.append(documentFrag);
        }
    }

    defaultRemoveError(element: HTMLElement) {
        if (element && element.parentElement) {
            const invalidFeedback = element.parentElement.querySelector('.invalid-feedback');
            if (invalidFeedback) {
                element.parentElement.removeChild(invalidFeedback);
            }
        }
    }

    removeError(element: HTMLElement) {
        const formControlElement = this.isElementInInputGroup(element) ? element.parentElement : element;
        formControlElement.classList.remove(INVALID_CLASS);
        if (helpers.isFunction(this.config.removeElementError)) {
            this.config.removeElementError(formControlElement);
        } else if (this.config.showElementError) {
            this.defaultRemoveError(formControlElement);
        } else {
            // do nothings
        }
    }

    showError(element: HTMLElement, errorMessages: string[]) {
        const formControlElement = this.isElementInInputGroup(element) ? element.parentElement : element;
        formControlElement.classList.add(INVALID_CLASS);
        if (helpers.isFunction(this.config.showElementError)) {
            this.config.showElementError(formControlElement, errorMessages);
        } else if (this.config.showElementError) {
            this.defaultShowError(formControlElement, errorMessages);
        } else {
            // do nothings
        }
    }

    addValidationMessages(messages: ThyFormValidationMessages) {
        Object.assign(this.config.validationMessages, messages);
    }

    setGlobalValidationMessages(validationMessages: Dictionary<string>) {
        this.config.globalValidationMessages = validationMessages;
    }
}
