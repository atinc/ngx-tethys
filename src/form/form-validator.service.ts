import {
    Injectable
} from '@angular/core';
import {
    NgForm,
    AbstractControl
} from '@angular/forms';
import { Dictionary } from '../typings';
import { helpers } from '../util';
import { ThyFormConfigLoader } from './form-config-loader';

@Injectable()
export class ThyFormValidatorService {

    // controls: Dictionary<AbstractControl>;

    private _ngForm: NgForm;

    private _formElement: HTMLElement;

    private _controls: Dictionary<{
        // control?: AbstractControl,
        hasError?: boolean,
        errorMessages?: string[]
    }> = {};

    private _initialized = false;

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
            this.thyFormConfigLoader.removeError(this._getElement(name));
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

    constructor(private thyFormConfigLoader: ThyFormConfigLoader) {

    }

    initialize(ngForm: NgForm, formElement: HTMLElement) {
        this._initializeFormControls(ngForm);
        this._ngForm = ngForm;
        this._formElement = formElement;
    }

    setControlError(name: string, errorMessages: string[]) {
        this._controls[name].errorMessages = errorMessages;
        this._controls[name].hasError = true;
        this.thyFormConfigLoader.showError(this._getElement(name), errorMessages);
    }

    validateControl(name: string, control: AbstractControl) {
        this._clearElementError(name);
        if (control.invalid) {
            const errorMessages = this.thyFormConfigLoader.getErrorMessages(name, control.errors);
            this.setControlError(name, errorMessages);
        }
    }

    validateControls() {
        for (const key in this._controls) {
            if (this._controls.hasOwnProperty(key)) {
                this.validateControl(key, this._ngForm.controls[key]);
            }
        }
    }

    validate($event?: Event): boolean {
        this._ngForm.onSubmit($event);
        this.validateControls();
        return this._ngForm.valid;
    }

    setElementErrorMessage(name: string, message: string) {
        this.setControlError(name, [message]);
    }
}
