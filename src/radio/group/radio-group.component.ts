import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { InputBoolean } from 'ngx-tethys/core';

import { ThyRadioButtonComponent } from '../button/radio-button.component';
import { ThyRadioComponent } from '../radio.component';

const buttonGroupSizeMap = {
    sm: ['btn-group-sm'],
    lg: ['btn-group-lg']
};

const radioGroupLayoutMap = {
    flex: ['radio-group-layout-flex']
};

/**
 * @name thy-radio-group
 * @order 20
 */
@Component({
    selector: 'thy-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioGroupComponent),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': `-1`
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyRadioGroupComponent implements ControlValueAccessor, OnInit, OnChanges, AfterContentInit {
    @HostBinding('class.thy-radio-group') thyRadioGroup = true;

    @HostBinding('class.btn-group') isButtonGroup = false;

    @HostBinding('class.btn-group-outline-default')
    isButtonGroupOutline = false;

    private _size: string;

    private _layout: string;

    private _disabled: boolean;

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    @Input()
    set thySize(size: string) {
        this._size = size;
    }

    @Input()
    set thyLayout(layout: string) {
        this._layout = layout;
    }

    _innerValue: string | number;

    radios: Array<ThyRadioComponent | ThyRadioButtonComponent> = [];

    private hostRenderer = useHostRenderer();

    /**
     * 是否禁用单选组合框
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyDisabled(value: boolean) {
        this._disabled = value;
    }

    onChange: (_: string) => void = () => null;
    onTouched: () => void = () => null;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

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
        this.onTouched();
        this.changeDetectorRef.detectChanges();
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

    ngOnChanges(changes: SimpleChanges): void {
        const { thyDisabled } = changes;
        if (thyDisabled) {
          this.setDisabledState(this.thyDisabled);
        }
    }

    ngAfterContentInit(): void {
        this.setDisabledState(this._disabled);
    }

    private _setClasses() {
        const classNames: string[] = [];
        if (buttonGroupSizeMap[this._size]) {
            classNames.push(buttonGroupSizeMap[this._size]);
        }
        if (radioGroupLayoutMap[this._layout]) {
            classNames.push(radioGroupLayoutMap[this._layout]);
        }
        this.hostRenderer.updateClass(classNames);
    }
}
