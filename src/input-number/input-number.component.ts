import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'thy-input-number',
    templateUrl: './input-number.component.html',
    exportAs: 'thyInputNumber',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyInputNumberComponent)
        }
    ]
})
export class ThyInputNumberComponent implements OnInit, ControlValueAccessor {
    @Input() model: number;

    @Input() min: number;

    @Input() max: number;

    @Input() thySize: string;

    @Input() thyDisabled: boolean;

    get count() {
        return this.model;
    }

    set count(value: number) {
        this.model = value;
        this.controlChange(this.model);
    }

    constructor() {}

    ngOnInit(): void {}

    private controlChange: Function = () => {};

    writeValue(value: number) {
        this.model = value;
    }

    registerOnChange(fn: Function): void {
        this.controlChange = fn;
    }

    registerOnTouched(fn: any) {}

    increment() {
        this.model++;
    }

    decrement() {
        this.model--;
    }
}
