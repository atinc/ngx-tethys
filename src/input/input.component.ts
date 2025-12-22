import { take } from 'rxjs/operators';

import { NgTemplateOutlet } from '@angular/common';
import {
    Component,
    ElementRef,
    forwardRef,
    NgZone,
    OnInit,
    TemplateRef,
    ViewEncapsulation,
    inject,
    input,
    effect,
    signal,
    output,
    contentChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { ThyInputDirective, ThyInputSize } from './input.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInput),
    multi: true
};

const noop = () => {};

const password = 'password';

/**
 * 内部集成输入框组件，建议 thy-input-group 和 thyInput 组合使用
 * @name thy-input
 * @order 50
 */
@Component({
    selector: 'thy-input',
    templateUrl: './input.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-input form-control',
        '[class.form-control-active]': 'focused()',
        '[class.disabled]': 'disabled()'
    },
    imports: [NgTemplateOutlet, ThyInputDirective, ThyAutofocusDirective, FormsModule, ThyIcon]
})
export class ThyInput implements ControlValueAccessor, OnInit {
    private ngZone = inject(NgZone);
    private elementRef = inject(ElementRef);

    /**
     * Placeholder
     */
    readonly placeholder = input('');

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'default' | 'lg'
     * @default default
     */
    readonly thySize = input<ThyInputSize>();

    /**
     * 是否自动聚焦
     */
    readonly thyAutofocus = input(false, { transform: coerceBooleanProperty });

    /**
     * 输入框类型
     * @type 'number' | 'input'
     */
    readonly thyType = input<string>();

    /**
     * @deprecated please use thyType
     */
    readonly _type = input<string>(undefined, { alias: 'type' });

    /**
     * 输入 Label 文本
     */
    readonly thyLabelText = input<string>();

    /**
     * 是否只读
     */
    readonly readonly = input(false, { transform: coerceBooleanProperty });

    /**
     * focus 聚焦事件
     */
    readonly focus = output<Event>();

    /**
     * blur 失焦事件
     */
    readonly blur = output<Event>();

    /**
     * 后置模板
     */
    readonly appendTemplate = contentChild<TemplateRef<any>>('append');

    /**
     * 前置模板
     */
    readonly prependTemplate = contentChild<TemplateRef<any>>('prepend');

    public type = signal<string | undefined>(undefined);

    public value = signal('');

    public showLabel = signal(false);

    public focused = signal(false);

    public disabled = signal(false);

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    public isPasswordType = signal(false);

    constructor() {
        effect(() => {
            this.type.set(this.thyType() || this._type());
        });
    }

    ngOnInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.isPasswordType.set(this.isPassword(this.type()));
        });
    }

    writeValue(value: any): void {
        this.value.set(value);
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onModelChange() {
        this.onChangeCallback(this.value());
    }

    onInputFocus(event: Event) {
        this.focused.set(true);
        this.showLabel.set(true);
        this.focus.emit(event);
    }

    onInputBlur(event: Event) {
        this.onTouchedCallback();
        if (this.elementRef.nativeElement.onblur) {
            this.elementRef.nativeElement.onblur(event);
        }
        this.focused.set(false);
        this.showLabel.set(false);
        this.blur.emit(event);
    }

    isPassword(value?: string) {
        return value === password;
    }

    togglePasswordType() {
        this.type.set(this.isPassword(this.type()) ? 'text' : 'password');
    }
}
