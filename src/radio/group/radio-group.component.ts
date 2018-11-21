import {
    Component,
    forwardRef,
    HostBinding,
    Input,
    ElementRef,
    OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyRadioComponent } from '../radio.component';
import { ThyRadioButtonComponent } from '../button/radio-button.component';
import { UpdateHostClassService } from '../../shared';
import { INHERITED_CLASS } from '@angular/core/src/reflection/reflection_capabilities';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
    lg: ['btn-group-lg']
};

// const radioGroupLayoutMap = {
//     flex: ['radio-button-group-flex']
// };

@Component({
    selector: 'thy-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [
        UpdateHostClassService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioGroupComponent),
            multi: true
        }
    ]
})
export class ThyRadioGroupComponent implements ControlValueAccessor, OnInit {
    @HostBinding('class.btn-group') isButtonGroup = false;
    @HostBinding('class.btn-group-outline-default')
    isButtonGroupOutline = false;

    private _size: string;

    private _layout: string;

    @Input()
    set thySize(size: string) {
        this._size = size;
    }

    // @Input()
    // set thyLayout(layout: string) {
    //     this._layout = layout;
    // }

    _innerValue: string | number;

    radios: Array<ThyRadioComponent | ThyRadioButtonComponent> = [];

    @Input()
    set thyDisabled(value: boolean) {
        this.setDisabledState(value);
    }

    onChange: (_: string) => void = () => null;
    onTouched: () => void = () => null;

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    addRadio(radio: ThyRadioComponent | ThyRadioButtonComponent): void {
        this.radios.push(radio);
        radio.thyChecked = radio.thyValue === this._innerValue;
    }

    updateValue(value: string, emit: boolean): void {
        this._innerValue = value;
        this.radios.forEach(radio => {
            radio.thyChecked = radio.thyValue === this._innerValue;
        });
        if (emit) {
            this.onChange(value);
        }
    }

    writeValue(value: any): void {
        this.updateValue(value, false);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.radios.forEach(radio => {
            radio.setDisabledState(isDisabled);
        });
    }

    setGroup() {
        if (!this.isButtonGroup && !this.isButtonGroupOutline) {
            this.isButtonGroup = true;
            this.isButtonGroupOutline = true;
        }
    }

    ngOnInit() {
        this._setClasses();
    }

    private _setClasses() {
        const classNames: string[] = [];
        if (buttonGroupSizeMap[this._size]) {
            classNames.push(buttonGroupSizeMap[this._size]);
        }
        // if (radioGroupLayoutMap[this._layout]) {
        //     classNames.push(radioGroupLayoutMap[this._layout]);
        // }
        this.updateHostClassService.updateClass(classNames);
    }
}
