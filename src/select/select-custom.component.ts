import { Component, forwardRef, HostBinding, Input, ElementRef, OnInit, HostListener } from '@angular/core';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { inputValueToBoolean } from '../util/helpers';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {
};

@Component({
    selector: 'thy-custom-select',
    templateUrl: './select-custom.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectCustomComponent),
            multi: true
        },
        UpdateHostClassService
    ]
})
export class ThySelectCustomComponent implements ControlValueAccessor, OnInit {

    _innerValue: any = null;

    _disabled = false;

    _size: InputSize;

    _expandOptions = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select-custom') _isSelectCustom = true;

    @Input()
    set thySize(value: InputSize) {
        this._size = value;
    }

    constructor(
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

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

    dropDownMenuToggle() {
        this._expandOptions = !this._expandOptions;
    }


    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this._expandOptions = false;
        }
    }

    ngOnInit() {
        const classes = this._size ? [`thy-select-custom-${this._size}`] : [];
        this.updateHostClassService.updateClass(classes);
    }
}
