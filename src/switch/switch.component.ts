import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    inject,
    viewChild,
    input,
    computed,
    signal,
    output,
    effect
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const supportedTypes: string[] = ['primary', 'info', 'warning', 'danger'];

const supportedSizes: string[] = ['', 'sm', 'xs'];

/**
 * 开关组件
 * @name thy-switch
 * @order 10
 */
@Component({
    selector: 'thy-switch',
    templateUrl: './switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ThySwitch), multi: true }],
    imports: [NgClass],
    host: { class: 'thy-switch', '[class.thy-switch-xs]': 'size() === "xs"', '[class.thy-switch-sm]': 'size() === "sm"' }
})
export class ThySwitch extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    /**
     * 类型，目前分为: 'primary' |'info' | 'warning' | 'danger'
     */
    readonly thyType = input<string>('primary');

    /**
     * 大小
     * @type xs | sm | md
     * @default md
     */
    readonly thySize = input<string>('');

    /**
     * 是否属于禁用状态
     */
    readonly inputDisabled = input(false, { transform: coerceBooleanProperty, alias: `thyDisabled` });

    /**
     * 是否加载中
     */
    readonly thyLoading = input(false, { transform: coerceBooleanProperty });

    /**
     * 数据变化的回调事件，即将被弃用，请使用 ngModelChange
     * @deprecated
     */
    readonly thyChange = output<Event>();

    model = signal<boolean>(false);

    disabled = signal(false);

    get thyDisabled() {
        return this.disabled() as boolean;
    }

    readonly type = computed(() => {
        if (!supportedTypes.includes(this.thyType())) {
            return 'primary';
        } else {
            return this.thyType();
        }
    });

    readonly size = computed(() => {
        if (!supportedSizes.includes(this.thySize())) {
            return '';
        } else {
            return this.thySize();
        }
    });

    readonly classNames = computed(() => {
        const classList = [`thy-switch-${this.type()}`];
        if (this.size()) {
            classList.push(`thy-switch-${this.size()}`);
        }
        if (this.disabled() || this.thyLoading()) {
            classList.push(`thy-switch-disabled`);
            if (this.model()) {
                classList.push(`thy-switch-disabled-true`);
            }
        }
        return classList;
    });

    readonly loadingCircle = computed(() => {
        const svgSize: Record<string, number> = { xs: 12, sm: 16 };
        const circleSize = svgSize[this.size()] ?? 20;
        const centerPoint = circleSize / 2;
        const r = circleSize / 4;
        return {
            viewBox: `0 0 ${circleSize} ${circleSize}`,
            cx: centerPoint,
            cy: centerPoint,
            r: r,
            dasharray: `${2 * Math.PI * r * 0.75} ${2 * Math.PI * r * 0.25}`
        };
    });

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    readonly switchElementRef = viewChild<string, ElementRef<HTMLElement>>('switch', { read: ElementRef<HTMLElement> });

    private cdr = inject(ChangeDetectorRef);

    constructor() {
        super();

        effect(() => {
            this.disabled.set(this.inputDisabled());
        });
    }

    writeValue(value: boolean) {
        this.model.set(value);
        this.cdr.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    toggle(event: Event) {
        this.model.set(!this.model());
        this.onModelChange(this.model());
        this.onModelTouched();
        this.thyChange?.emit(event);
    }
}
