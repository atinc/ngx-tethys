import { Dictionary } from 'ngx-tethys/types';
import { helpers } from 'ngx-tethys/util';

import { Inject, Injectable, Optional, Signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { THY_VALIDATOR_CONFIG, ThyFormValidationMessages, ThyFormValidatorGlobalConfig } from './form.class';
import { injectLocale, ThyFormLocale } from 'ngx-tethys/i18n';

export const ERROR_VALUE_REPLACE_REGEX = /\{(.+?)\}/g;

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

const defaultValidatorConfig: ThyFormValidatorGlobalConfig = {
    showElementError: true,
    removeElementError: true,
    validationMessages: {}
};

/**
 * @private
 */
@Injectable()
export class ThyFormValidatorLoader {
    private config: ThyFormValidatorGlobalConfig;
    private locale: Signal<ThyFormLocale> = injectLocale('form');

    private globalValidationMessages = {
        required: this.locale().required,
        maxlength: this.locale().maxlength,
        minlength: this.locale().minlength,
        thyUniqueCheck: this.locale().uniqueCheck,
        email: this.locale().email,
        confirm: this.locale().confirm,
        pattern: this.locale().pattern,
        number: this.locale().number,
        url: this.locale().url,
        max: this.locale().max,
        min: this.locale().min
    };

    private getDefaultValidationMessage(key: string) {
        if (this.config.globalValidationMessages && this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        } else {
            return this.globalValidationMessages[key as keyof typeof this.globalValidationMessages];
        }
    }

    constructor(
        @Optional()
        @Inject(THY_VALIDATOR_CONFIG)
        config: ThyFormValidatorGlobalConfig
    ) {
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
