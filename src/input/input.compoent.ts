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

    @Input() type = 'text';

    @Input() placeholder = '';

    @Input() thySize: string;

    @Input() thyInputAutoFocus: boolean;

    @ContentChild('append') appendTemplate: TemplateRef<any>;

    @ContentChild('prepend') prependTemplate: TemplateRef<any>;

    @ViewChild('append') appendElement: ElementRef<HTMLDivElement>;

    @ViewChild('prepend') prependElement: ElementRef<HTMLDivElement>;

    @ViewChild('input') inputElement: ElementRef<HTMLDivElement>;

    @HostBinding('class.input-container') _isSearchContainer = true;

    @HostBinding('class.form-control') _isFormControl = true;

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

}

