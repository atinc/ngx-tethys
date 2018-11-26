import {
    Component, HostBinding, Input, Output,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation, EventEmitter, forwardRef, ViewChild, OnInit, AfterViewInit, Renderer2
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputComponent),
    multi: true
};

const noop = () => { };

const password = 'password';

@Component({
    selector: 'thy-input',
    templateUrl: './input.component.html',
    providers: [
        UpdateHostClassService,
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputComponent implements ControlValueAccessor, AfterViewInit {

    @Input() placeholder = '';

    @Input() thySize: string;

    @Input() thyInputAutoFocus: boolean;

    @Input() set type(value: string) {
        this._type = value;
        if (this.isPassword(value)) {
            this.appendTemplate = this.eyeTemplate;
        }
    }

    get type() {
        return this._type;
    }

    @Input() set thyType(value: string) {
        this.type = value;
    }

    @ContentChild('append') appendTemplate: TemplateRef<any>;

    @ContentChild('prepend') prependTemplate: TemplateRef<any>;

    @ViewChild('eye') eyeTemplate: TemplateRef<any>;

    @HostBinding('class.input-container') _isSearchContainer = true;

    @HostBinding('class.form-control') _isFormControl = true;

    public _type = 'text';

    public value: string;

    public disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    constructor(
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onModelChange() {
        this.onChangeCallback(this.value);
    }

    isPassword(value: string) {
        return value === password;
    }

    togglePasswordType() {
        this.type = this.isPassword(this.type) ? 'text' : 'password';
    }
}

