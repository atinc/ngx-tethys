import {
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    NgZone,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ThyInputSize, ThyInputDirective } from './input.directive';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { NgIf, NgTemplateOutlet } from '@angular/common';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputComponent),
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
        '[class.form-control-active]': 'focused',
        '[class.disabled]': 'disabled'
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, ThyInputDirective, ThyAutofocusDirective, FormsModule, ThyIconComponent]
})
export class ThyInputComponent implements ControlValueAccessor, OnInit {
    /**
     * Placeholder
     */
    @Input() placeholder = '';

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'default' | 'lg'
     * @default default
     */
    @Input() thySize: ThyInputSize;

    /**
     * 是否自动聚焦
     * @default false
     */
    @Input() thyAutofocus = false;

    /**
     * 输入框类型
     * @type 'number' | 'input'
     */
    @Input()
    set thyType(value: string) {
        this.type = value;
    }

    /**
     * @deprecated please use thyType
     */
    @Input() type: string;

    /**
     * 输入 Label 文本
     */
    @Input() thyLabelText: string;

    /**
     * 是否只读
     */
    @Input() readonly = false;

    /**
     * focus 聚焦事件
     */
    @Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * blur 失焦事件
     */
    @Output() blur: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * 后置模板
     */
    @ContentChild('append') appendTemplate: TemplateRef<any>;

    /**
     * 前置模板
     */
    @ContentChild('prepend') prependTemplate: TemplateRef<any>;

    @ViewChild('eye', { static: true }) eyeTemplate: TemplateRef<any>;

    public _type = 'text';

    public value: string;

    public showLabel: boolean;

    public focused = false;

    public disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    constructor(private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            if (this.isPassword(this.type)) {
                this.appendTemplate = this.eyeTemplate;
            }
        });
    }

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

    onModelChange() {
        this.onChangeCallback(this.value);
    }

    onInputFocus(event: Event) {
        this.focused = true;
        this.showLabel = true;
        this.focus.emit(event);
    }

    onInputBlur(event: Event) {
        this.focused = false;
        this.showLabel = false;
        this.blur.emit(event);
    }

    isPassword(value: string) {
        return value === password;
    }

    togglePasswordType() {
        this.type = this.isPassword(this.type) ? 'text' : 'password';
    }
}
