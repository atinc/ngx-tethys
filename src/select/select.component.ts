import { Component, forwardRef, HostBinding, Input, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { inputValueToBoolean } from '../util/helpers';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {
};

@Component({
    selector: 'thy-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectComponent),
            multi: true
        },
        UpdateHostClassService
    ]
})
export class ThySelectComponent implements ControlValueAccessor, OnInit {

    // The internal data model
    _innerValue: any = null;
    _disabled = false;
    _size: InputSize;
    _expandOptions = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select') _isSelect = true;

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    @Input() name: string;

    @Input() thyAllowClear = false;

    writeValue(obj: any): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngModelChange() {
        this.onChangeCallback(this._innerValue);
    }

    ngOnInit() {
        const classes = this._size ? [`thy-select-${this._size}`] : [];
        this.updateHostClassService.updateClass(classes);
    }

    clearSelectValue(event: Event) {
        event.stopPropagation();
        this._innerValue = '';
        this.onChangeCallback(this._innerValue);
    }

}
