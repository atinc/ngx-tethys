import { Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabIndexDisabledControlValueAccessorMixin, InputBoolean } from 'ngx-tethys/core';
import { elementMatchClosest } from 'ngx-tethys/util';

import { NgIf } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective } from 'ngx-tethys/input';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {};

/**
 * 下拉选择
 * @name thy-select
 * @order 20
 */
@Component({
    selector: 'thy-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelect),
            multi: true
        }
    ],
    standalone: true,
    imports: [ThyInputDirective, FormsModule, ThyIcon, NgIf],
    host: {
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class ThySelect extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor, OnInit {
    @ViewChild('select', { static: true }) selectElement: ElementRef<any>;

    // The internal data model
    _innerValue: any = null;
    _disabled = false;
    _size: InputSize;
    _expandOptions = false;

    private hostRenderer = useHostRenderer();

    @HostBinding('class.thy-select') _isSelect = true;

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    @Input() name: string;

    @Input() @InputBoolean() thyAllowClear = false;

    writeValue(obj: any): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
        }
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    ngModelChange() {
        this.onChangeFn(this._innerValue);
        this.onTouchedFn();
    }

    ngOnInit() {
        const classes = this._size ? [`thy-select-${this._size}`] : [];
        this.hostRenderer.updateClass(classes);
    }

    onBlur(event: FocusEvent) {
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, 'thy-select')) {
            return;
        }
        this.onTouchedFn();
    }

    onFocus(event?: Event) {
        this.selectElement.nativeElement.focus();
    }

    clearSelectValue(event: Event) {
        event.stopPropagation();
        this._innerValue = '';
        this.onChangeFn(this._innerValue);
    }
}
