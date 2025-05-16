import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostBinding,
    inject,
    input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyRadioButton } from '../button/radio-button.component';
import { ThyRadio } from '../radio.component';
import { IThyRadioGroupComponent, THY_RADIO_GROUP_COMPONENT } from '../radio.token';

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
            useExisting: forwardRef(() => ThyRadioGroup),
            multi: true
        },
        {
            provide: THY_RADIO_GROUP_COMPONENT,
            useExisting: ThyRadioGroup
        }
    ],
    host: {
        '[attr.tabindex]': `-1`
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyRadioGroup implements IThyRadioGroupComponent, ControlValueAccessor, OnInit, OnChanges, AfterContentInit {
    private changeDetectorRef = inject(ChangeDetectorRef);

    @HostBinding('class.thy-radio-group') thyRadioGroup = true;

    @HostBinding('class.btn-group') isButtonGroup = false;

    @HostBinding('class.btn-group-outline-default')
    isButtonGroupOutline = false;

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    readonly thySize = input<string>('md');

    /**
     * 布局
     * @type flex
     */
    readonly thyLayout = input<string>();

    _innerValue: string | number;

    radios: Array<ThyRadio | ThyRadioButton> = [];

    private hostRenderer = useHostRenderer();

    /**
     * 是否禁用单选组合框
     * @default false
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    onChange: (_: string) => void = () => null;
    onTouched: () => void = () => null;

    addRadio(radio: ThyRadio | ThyRadioButton): void {
        this.radios.push(radio);
        radio.thyChecked = radio.thyValue() === this._innerValue;
    }

    updateValue(value: string, emit: boolean): void {
        this._innerValue = value;
        this.radios.forEach(radio => {
            radio.thyChecked = radio.thyValue() === this._innerValue;
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

    setGroup(): void {
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
            this.setDisabledState(this.thyDisabled());
        }
    }

    ngAfterContentInit(): void {
        this.setDisabledState(this.thyDisabled());
    }

    private _setClasses() {
        const classNames: string[] = [];
        const size = this.thySize();
        if (size && buttonGroupSizeMap[size]) {
            classNames.push(buttonGroupSizeMap[size]);
        }
        const layout = this.thyLayout();
        if (layout && radioGroupLayoutMap[layout]) {
            classNames.push(radioGroupLayoutMap[layout]);
        }
        this.hostRenderer.updateClass(classNames);
    }
}
