import {
    Injectable
} from '@angular/core';
import {
    NgForm,
    AbstractControl
} from '@angular/forms';
import { Dictionary } from '../typings';
import { helpers } from '../util';
import { ThyFormValidatorLoader } from './form-validator-loader';

@Injectable()
export class ThyFormValidatorService {

    private _ngForm: NgForm;

    private _formElement: HTMLElement;

    private _controls: Dictionary<{
        hasError?: boolean,
        errorMessages?: string[]
    }> = {};

    private _initialized = false;

    // public errors: string[];

    private _getElement(name: string) {
        const element = this._formElement[name];
        if (element) {
            return element;
        } else {
            return this._formElement.querySelector(`[name='${name}']`);
        }
    }

    private _clearElementError(name: string) {
        if (!helpers.isEmpty(this._controls[name].errorMessages)) {
            this._controls[name].errorMessages = [];
            this.thyFormValidateLoader.removeError(this._getElement(name));
        }
    }

    private _initializeFormControl(name: string, control: AbstractControl) {
        this._controls[name] = {
            hasError: false
            // control: control
        };
        control.valueChanges.subscribe(() => {
            this._clearElementError(name);
        });
        control.statusChanges.subscribe(() => {

        });
    }

    private _initializeFormControls(ngForm: NgForm) {
        if (this._initialized) {
            return;
        }
        const allKeys = [];
        for (const key in ngForm.controls) {
            if (ngForm.controls.hasOwnProperty(key)) {
                allKeys.push(key);
                const formControl = ngForm.controls[key];
                this._initializeFormControl(key, formControl);
            }
        }
        if (allKeys.length > 0) {
            this._initialized = true;
        }

    }

    constructor(private thyFormValidateLoader: ThyFormValidatorLoader) {

    }

    initialize(ngForm: NgForm, formElement: HTMLElement) {
        this._initializeFormControls(ngForm);
        this._ngForm = ngForm;
        this._formElement = formElement;
    }

    setControlError(name: string, errorMessages: string[]) {
        this._controls[name].errorMessages = errorMessages;
        this._controls[name].hasError = true;
        this.thyFormValidateLoader.showError(this._getElement(name), errorMessages);
    }

    validateControl(name: string) {
        this._clearElementError(name);
        const control = this._ngForm.controls[name];
        if (control && control.invalid) {
            const errorMessages = this.thyFormValidateLoader.getErrorMessages(name, control.errors);
            this.setControlError(name, errorMessages);
        }
    }

    validateControls() {
        for (const key in this._controls) {
            if (this._controls.hasOwnProperty(key)) {
                this.validateControl(key);
            }
        }
    }

    validate($event?: Event): boolean {
        this._ngForm.onSubmit($event);
        this.validateControls();
        return this._ngForm.valid;
    }

    reset() {
        this._ngForm.reset();
        for (const name in this._controls) {
            if (this._controls.hasOwnProperty(name)) {
                const control = this._controls[name];
                control.errorMessages = [];
                control.hasError = false;
                this._clearElementError(name);
            }
        }
    }

    setElementErrorMessage(name: string, message: string) {
        this._clearElementError(name);
        this.setControlError(name, [message]);
    }
}
