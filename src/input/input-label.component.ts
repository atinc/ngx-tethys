import {
    Component,
    HostBinding,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    EventEmitter,
    forwardRef,
    ViewChild
} from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputLabelComponent),
    multi: true
};

const noop = () => {};

@Component({
    selector: 'thy-input-label',
    templateUrl: './input-label.component.html',
    providers: [UpdateHostClassService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputLabelComponent implements ControlValueAccessor {
    @HostBinding('class.input-label-container') _isLabelContainer = true;

    @ViewChild('inputLabelControl') inputLabelControl: ElementRef<
        HTMLDivElement
    >;

    @Input() name = '';

    @Input() placeholder = '';

    @Input() label = '';

    @Input()
    set thyLabelFocus(value: boolean) {
        this.autoFocus = value;
    }

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    public disabled = false;

    public autoFocus = false;

    public value: string;

    public isShowLabel = false;

    constructor() {}

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

    labelModelChange() {
        this.onChangeCallback(this.value);
    }

    onFocusEnter() {
        this.isShowLabel = true;
    }

    onBlurLeave() {
        this.isShowLabel = false;
    }
}
