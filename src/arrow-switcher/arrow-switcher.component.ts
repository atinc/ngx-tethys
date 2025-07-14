import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    forwardRef,
    numberAttribute,
    inject,
    input,
    output,
    computed,
    Signal,
    WritableSignal,
    signal,
    linkedSignal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyAction } from 'ngx-tethys/action';

export type ThyArrowSwitcherTheme = 'default' | 'lite';
export interface ThyArrowSwitcherEvent {
    index: number;
    event: Event;
}

/**
 * 上下条切换组件
 * @name thy-arrow-switcher
 * @order 10
 */
@Component({
    selector: 'thy-arrow-switcher',
    templateUrl: './arrow-switcher.component.html',
    host: {
        class: 'thy-arrow-switcher',
        '[class.thy-arrow-switcher-small]': 'isSmallSize()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyArrowSwitcher),
            multi: true
        }
    ],
    imports: [ThyAction, ThyTooltipDirective, ThyIcon, ThyButtonIcon]
})
export class ThyArrowSwitcher implements ControlValueAccessor {
    private cd = inject(ChangeDetectorRef);

    private disabled: WritableSignal<boolean> = signal(false);

    /**
     * 点击上一条事件
     */
    readonly thyPrevious = output<ThyArrowSwitcherEvent>();

    /**
     * 点击下一条事件
     */
    readonly thyNext = output<ThyArrowSwitcherEvent>();

    /**
     * 设置上一条 Hover Tooltip 提示
     */
    readonly thyPreviousTooltip = input<string>();

    /**
     * 设置下一条 Hover Tooltip 提示
     */
    readonly thyNextTooltip = input<string>();

    /**
     * 展示主题
     * @type default | lite
     */
    readonly thyTheme = input<ThyArrowSwitcherTheme>('default');

    /**
     * 总条数
     */
    readonly thyTotal = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 尺寸大小，默认尺寸为大号，取值为`sm`时展示小号
     */
    readonly thySize = input<string>();

    readonly isSmallSize: Signal<boolean> = computed(() => {
        return this.thySize() === 'sm';
    });

    protected readonly index: WritableSignal<number> = signal(0);

    readonly previousDisabled = computed(() => {
        return this.index() <= 0 || this.disabled();
    });

    readonly nextDisabled = computed(() => {
        return this.index() >= this.thyTotal() - 1 || this.disabled();
    });

    private onModelChange: (value: number) => void;

    private onModelTouched: () => void;

    protected readonly previousTooltip = linkedSignal(() => {
        return this.thyPreviousTooltip();
    });

    protected readonly nextTooltip = linkedSignal(() => {
        return this.thyNextTooltip();
    });

    public setPreviousTooltip(value: string) {
        this.previousTooltip.set(value);
    }

    public setNextTooltip(value: string) {
        this.nextTooltip.set(value);
    }

    writeValue(value: number): void {
        if (value >= 0) {
            this.index.set(value);
        }
        this.cd.markForCheck();
    }

    registerOnChange(fn: () => void) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisable: boolean) {
        this.disabled.set(isDisable);
    }

    onPreviousClick(event: Event) {
        this.index.set(this.index() - 1);
        this.onModelChange(this.index());

        this.thyPrevious.emit({ index: this.index(), event });
    }

    onNextClick(event: Event) {
        this.index.set(this.index() + 1);
        this.onModelChange(this.index());

        this.thyNext.emit({ index: this.index(), event });
    }
}
