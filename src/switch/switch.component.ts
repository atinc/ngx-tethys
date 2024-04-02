import { NgClass, NgIf } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';

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
            useExisting: forwardRef(() => ThySwitch),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgClass, NgIf],
    host: {
        class: 'thy-switch',
        '[class.thy-switch-xs]': 'size === "xs"',
        '[class.thy-switch-sm]': 'size === "sm"'
    }
})
export class ThySwitch extends TabIndexDisabledControlValueAccessorMixin implements OnInit, ControlValueAccessor {
    public model: boolean;

    public type?: string = 'primary';

    public size?: string = '';

    public disabled?: boolean = false;

    public loading: boolean = false;

    public classNames: string[];

    public typeArray: string[] = ['primary', 'info', 'warning', 'danger'];

    public sizeArray: string[] = ['', 'sm', 'xs'];

    public loadingCircle: {
        viewBox?: string;
        cx?: number;
        cy?: number;
        r?: number;
        dasharray?: string;
    } = {};

    private initialized = false;

    private loadingInitialized = false;

    private isDisabledFirstChange = true;

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

        if (this.loadingInitialized) {
            this.setLoadingCircle();
        }
    }

    /**
     * 是否属于禁用状态
     */
    @Input({ transform: booleanAttribute })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
        this.setClassNames();
    }
    override get thyDisabled(): boolean {
        return this.disabled;
    }

    /**
     * 是否加载中
     */
    @Input({ transform: booleanAttribute }) set thyLoading(value: boolean) {
        this.loading = value;
        if (this.initialized) {
            this.setClassNames();
        }

        if (this.loading && !this.loadingInitialized) {
            this.setLoadingCircle();
            this.loadingInitialized = true;
        }
    }

    /**
     * 数据变化的回调事件，即将被弃用，请使用 ngModelChange
     * @deprecated
     */
    @Output() thyChange: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(public cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.setClassNames();
        this.initialized = true;
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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = (this.isDisabledFirstChange && this.thyDisabled) || isDisabled;
        this.isDisabledFirstChange = false;
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
        if (this.disabled || this.loading) {
            this.classNames.push(`thy-switch-disabled`);
            if (this.model) {
                this.classNames.push(`thy-switch-disabled-true`);
            }
        }
        this.cdr.markForCheck();
    }

    setLoadingCircle() {
        const svgSize = {
            ['xs']: 12,
            ['sm']: 16,
            ['']: 20
        };

        const circleSize = svgSize[this.size];
        const centerPoint = circleSize / 2;
        const r = circleSize / 4;

        this.loadingCircle = {
            viewBox: `0 0 ${circleSize} ${circleSize}`,
            cx: centerPoint,
            cy: centerPoint,
            r: r,
            dasharray: `${2 * Math.PI * r * 0.75} ${2 * Math.PI * r * 0.25}`
        };
        this.cdr.markForCheck();
    }
}
