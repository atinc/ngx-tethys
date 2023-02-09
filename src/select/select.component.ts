import { _MatMixinBase } from 'ngx-tethys/core';

import { Component, ElementRef, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {};

@Component({
    selector: 'thy-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectComponent),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThySelectComponent extends _MatMixinBase implements ControlValueAccessor, OnInit {
    // The internal data model
    _innerValue: any = null;
    _disabled = false;
    _size: InputSize;
    _expandOptions = false;

    private hostRenderer = useHostRenderer();

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

    constructor(private elementRef: ElementRef) {
        super();
    }

    ngModelChange() {
        this.onChangeCallback(this._innerValue);
        this.onTouchedCallback();
    }

    ngOnInit() {
        const classes = this._size ? [`thy-select-${this._size}`] : [];
        this.hostRenderer.updateClass(classes);
    }

    onBlur(event: Event) {
        this.onTouchedCallback();
        if (this.elementRef.nativeElement.onblur) {
            this.elementRef.nativeElement.onblur();
        }
    }

    clearSelectValue(event: Event) {
        event.stopPropagation();
        this._innerValue = '';
        this.onChangeCallback(this._innerValue);
        this.onTouchedCallback();
        if (this.elementRef.nativeElement.onblur) {
            this.elementRef.nativeElement.onblur();
        }
    }
}
