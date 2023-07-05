import { helpers } from 'ngx-tethys/util';

import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 开关组件
 * @name thy-switch
 * @order 10
 */
@Component({
    selector: 'thy-switch',
    templateUrl: './switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySwitchComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgClass],
    host: {
        class: 'thy-switch',
        '[class.thy-switch-xs]': 'size === "xs"',
        '[class.thy-switch-sm]': 'size === "sm"'
    }
})
export class ThySwitchComponent implements OnInit, ControlValueAccessor, OnChanges {
    public model: boolean;

    public type?: String = 'primary';

    public size?: String = '';

    public disabled?: Boolean = false;

    public classNames: string[];

    public typeArray: string[] = ['primary', 'info', 'warning', 'danger'];

    public sizeArray: string[] = ['', 'sm', 'xs'];

    private initialized = false;

    @ViewChild('switch', { static: true }) switchElementRef: ElementRef;

    /**
     * 类型，目前分为: 'primary' |'info' | 'warning' | 'danger'
     */
    @Input()
    set thyType(value: string) {
        if (!this.typeArray.includes(value)) {
            value = 'primary';
        }
        this.type = value;
        if (this.initialized) {
            this.setClassNames();
        }
    }

    /**
     * 大小
     * @type xs | sm | md
     * @default md
     */
    @Input()
    set thySize(value: string) {
        if (!this.sizeArray.includes(value)) {
            value = '';
        }
        this.size = value;
        if (this.initialized) {
            this.setClassNames();
        }
    }

    /**
     * 是否属于禁用状态
     */
    @Input() @InputBoolean() thyDisabled: boolean = false;

    /**
     * 数据变化的回调事件，即将被弃用，请使用 ngModelChange
     * @deprecated
     */
    @Output() thyChange: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(public cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.setClassNames();
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        // 兼容降级后的Switch，使用onChanges
        if (changes.thyDisabled) {
            const value = changes.thyDisabled.currentValue;
            this.disabled = helpers.isBoolean(value) ? Boolean(value) : value === 'true' || value === '1';
            this.setClassNames();
        }
    }

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    writeValue(value: boolean) {
        this.model = value;
        this.cdr.markForCheck();
        // this.setClassNames();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: Boolean) {
        this.disabled = isDisabled;
        this.setClassNames();
    }

    toggle(event: Event) {
        this.model = !this.model;
        this.onModelChange(this.model);
        this.onModelTouched();
        this.thyChange.emit(event);
    }

    setClassNames() {
        this.classNames = [`thy-switch-${this.type}`];
        if (this.size) {
            this.classNames.push(`thy-switch-${this.size}`);
        }
        if (this.disabled) {
            this.classNames.push(`thy-switch-disabled`);
            if (this.model) {
                this.classNames.push(`thy-switch-disabled-true`);
            }
        }
    }
}
