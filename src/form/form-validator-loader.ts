import {
    InjectionToken,
    Inject,
    Injectable,
    Optional
} from '@angular/core';
import { ThyFormValidatorConfig, ThyFormValidationMessages, THY_VALIDATOR_CONFIG } from './form.class';
import { Dictionary } from '../typings';
import { ValidationErrors, } from '@angular/forms';
import { helpers } from '../util';

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

const defaultValidatorConfig: ThyFormValidatorConfig = {
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
    repeat: '两次输入不一致',
    pattern: '该选项输入格式不正确',
    number: '必须输入数字',
    url: '输入URL格式不正确',
    max: '该选项输入值不能大于{max}',
    min: '该选项输入值不能小于{min}'

};

@Injectable()
export class ThyFormValidatorLoader {

    private config: ThyFormValidatorConfig;

    private _getDefaultValidationMessage(key: string) {
        if (this.config.globalValidationMessages && this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        } else {
            return globalValidationMessages[key];
        }
    }
    constructor(
        @Optional() @Inject(THY_VALIDATOR_CONFIG) config: ThyFormValidatorConfig
    ) {
        this.config = Object.assign({}, defaultValidatorConfig, config);
    }

    get validationMessages() {
        return this.config.validationMessages;
    }

    getErrorMessage(name: string, key: string) {
        if (this.validationMessages[name] && this.validationMessages[name][key]) {
            return this.validationMessages[name][key];
        } else {
            return this._getDefaultValidationMessage(key);
        }
    }

    getErrorMessages(name: string, validationErrors: ValidationErrors) {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this.getErrorMessage(name, validationError));
            }
        }
        return messages;
    }

    defaultShowError(element: any, errorMessages: string[]) {
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
            element.parentElement.removeChild(invalidFeedback);
        }
    }

    removeError(element: HTMLElement) {
        element.classList.remove(INVALID_CLASS);
        if (helpers.isFunction(this.config.removeElementError)) {
            (this.config.showElementError as any)(element);
        } else if (this.config.showElementError) {
            this.defaultRemoveError(element);
        } else {
            // do nothings
        }
    }

    showError(element: HTMLElement, errorMessages: string[]) {
        element.classList.add(INVALID_CLASS);
        if (helpers.isFunction(this.config.showElementError)) {
            (this.config.showElementError as any)(element, errorMessages);
        } else if (this.config.showElementError) {
            this.defaultShowError(element, errorMessages);
        } else {
            // do nothings
        }

    }

    addValidationMessages(messages: ThyFormValidationMessages) {
        Object.assign(this.config.validationMessages, messages);
    }
}
