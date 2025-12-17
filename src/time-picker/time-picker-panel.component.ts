import { DecimalPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ElementRef,
    forwardRef,
    inject,
    input,
    NgZone,
    OnDestroy,
    OnInit,
    output,
    Signal,
    viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { reqAnimFrame } from 'ngx-tethys/core';
import { injectLocale, ThyTimePickerLocale } from 'ngx-tethys/i18n';
import { coerceBooleanProperty, isValid, TinyDate } from 'ngx-tethys/util';

/**
 * 时间选择面板组件
 * @name thy-time-picker-panel
 */
@Component({
    selector: 'thy-time-picker-panel',
    templateUrl: './time-picker-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyTimePanel)
        }
    ],
    host: {
        class: 'thy-time-picker-panel',
        '[class.thy-time-picker-panel-has-bottom-operation]': `thyShowOperations()`,
        '[class.thy-time-picker-panel-columns-2]': `showColumnCount() === 2`,
        '[class.thy-time-picker-panel-columns-3]': `showColumnCount() === 3`
    },
    imports: [ThyButton, DecimalPipe]
})
export class ThyTimePanel implements OnInit, OnDestroy, ControlValueAccessor {
    private cdr = inject(ChangeDetectorRef);
    private ngZone = inject(NgZone);
    locale: Signal<ThyTimePickerLocale> = injectLocale('timePicker');

    readonly hourListRef = viewChild<ElementRef<HTMLElement>>('hourListElement');

    readonly minuteListRef = viewChild<ElementRef<HTMLElement>>('minuteListElement');

    readonly secondListRef = viewChild<ElementRef<HTMLElement>>('secondListElement');

    /**
     * 展示的日期格式，支持 'HH:mm:ss' | 'HH:mm' | 'mm:ss'
     * @type string
     * @default HH:mm:ss
     */
    readonly thyFormat = input<string>('HH:mm:ss');

    /**
     * 小时间隔步长
     * @type number
     */
    readonly thyHourStep = input<number>(1);

    /**
     * 分钟间隔步长
     * @type number
     */
    readonly thyMinuteStep = input<number>(1);

    /**
     * 秒间隔步长
     * @type number
     */
    readonly thySecondStep = input<number>(1);

    /**
     * 展示选择此刻
     * @type boolean
     */
    readonly thyShowSelectNow = input(true, { transform: coerceBooleanProperty });

    /**
     * 展示底部操作
     * @type boolean
     */
    readonly thyShowOperations = input(true, { transform: coerceBooleanProperty });

    /**
     * 选择时间触发的事件
     * @type EventEmitter<Date>
     */
    readonly thyPickChange = output<Date>();

    /**
     * 关闭面板事件
     * @type EventEmitter<void>
     */
    readonly thyClosePanel = output<void>();

    // margin-top + 1px border
    SCROLL_OFFSET_SPACING = 5;

    SCROLL_DEFAULT_DURATION = 120;

    prefixCls = 'thy-time-picker-panel';

    hourRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    minuteRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    secondRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    public readonly showHourColumn = computed(() => {
        const format = this.thyFormat();
        if (format) {
            return new Set(format).has('H') || new Set(format).has('h');
        }
        return true;
    });

    public readonly showMinuteColumn = computed(() => {
        const format = this.thyFormat();
        if (format) {
            return new Set(format).has('m');
        }
        return true;
    });

    public readonly showSecondColumn = computed(() => {
        const format = this.thyFormat();
        if (format) {
            return new Set(format).has('s');
        }
        return true;
    });

    readonly showColumnCount = computed(() => {
        const showHour = this.showHourColumn();
        const showMinute = this.showMinuteColumn();
        const showSecond = this.showSecondColumn();
        return [showHour, showMinute, showSecond].filter(m => m).length || 3;
    });

    value!: Date;

    hour!: number;

    minute!: number;

    second!: number;

    initialScrollPosition!: boolean;

    onValueChangeFn: (val: Date) => void = () => void 0;

    onTouchedFn: () => void = () => void 0;

    constructor() {}

    ngOnInit(): void {
        this.generateTimeRange();
        this.initialValue();
        setTimeout(() => {
            this.initialScrollPosition = true;
        });
    }

    generateTimeRange() {
        this.hourRange = this.buildTimeRange(24, this.thyHourStep());
        this.minuteRange = this.buildTimeRange(60, this.thyMinuteStep());
        this.secondRange = this.buildTimeRange(60, this.thySecondStep());
    }

    pickHours(hours: { value: number; disabled: boolean }, index: number) {
        this.value.setHours(hours.value);
        this.hour = hours.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.hourListRef()!.nativeElement, index);
    }

    pickMinutes(minutes: { value: number; disabled: boolean }, index: number) {
        this.value.setMinutes(minutes.value);
        this.minute = minutes.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.minuteListRef()!.nativeElement, index);
    }

    pickSeconds(seconds: { value: number; disabled: boolean }, index: number) {
        this.value.setSeconds(seconds.value);
        this.second = seconds.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.secondListRef()!.nativeElement, index);
    }

    selectNow() {
        this.value = new TinyDate()?.nativeDate;
        this.setHMSProperty();
        this.thyPickChange.emit(this.value);
        this.thyClosePanel.emit();
    }

    confirmPickTime() {
        this.onValueChangeFn(this.value || new TinyDate()?.nativeDate);
        this.thyClosePanel.emit();
    }

    scrollTo(container: HTMLElement, index: number = 0, duration: number = this.SCROLL_DEFAULT_DURATION) {
        const offsetTop = (container.children[index] as HTMLElement).offsetTop - this.SCROLL_OFFSET_SPACING;
        this.runScrollAnimationFrame(container, offsetTop, duration);
    }

    writeValue(value: Date | number): void {
        if (value && isValid(value)) {
            this.value = new TinyDate(value)?.nativeDate;
            this.setHMSProperty();
        } else {
            this.initialValue();
        }
        this.autoScroll(this.initialScrollPosition ? this.SCROLL_DEFAULT_DURATION : 0);

        this.cdr.markForCheck();
    }

    registerOnChange(fn: (value: Date) => void): void {
        this.onValueChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = fn;
    }

    private initialValue() {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.value = new TinyDate().setHms(0, 0, 0).nativeDate;
    }

    private buildTimeRange(length: number, step: number = 1, start: number = 0, disables: number[] = []) {
        return new Array(Math.ceil(length / step)).fill(0).map((_, i) => {
            const value = (i + start) * step;
            return {
                value: value,
                disabled: disables.indexOf(value) > -1
            };
        });
    }

    private setHMSProperty() {
        this.hour = this.value.getHours();
        this.minute = this.value.getMinutes();
        this.second = this.value.getSeconds();
    }

    private resetScrollPosition() {
        const hourListRef = this.hourListRef();
        if (hourListRef) {
            hourListRef.nativeElement.scrollTop = 0;
        }
        const minuteListRef = this.minuteListRef();
        if (minuteListRef) {
            minuteListRef.nativeElement.scrollTop = 0;
        }
        const secondListRef = this.secondListRef();
        if (secondListRef) {
            secondListRef.nativeElement.scrollTop = 0;
        }
        this.initialScrollPosition = false;
    }

    private runScrollAnimationFrame(container: HTMLElement, to: number, duration: number = this.SCROLL_DEFAULT_DURATION) {
        if (duration <= 0) {
            container.scrollTop = to;
            return;
        }
        const offset = to - container.scrollTop;
        const frame = (offset / duration) * 10;
        this.ngZone.runOutsideAngular(() => {
            reqAnimFrame(() => {
                container.scrollTop += frame;
                if (container.scrollTop === to) {
                    return;
                }
                this.runScrollAnimationFrame(container, to, duration - 10);
            });
        });
    }

    private autoScroll(duration: number = this.SCROLL_DEFAULT_DURATION) {
        const hourListRef = this.hourListRef();
        if (hourListRef) {
            this.scrollTo(
                hourListRef.nativeElement,
                this.hourRange.findIndex(m => m.value === this.hour),
                duration
            );
        }
        const minuteListRef = this.minuteListRef();
        if (minuteListRef) {
            this.scrollTo(
                minuteListRef.nativeElement,
                this.minuteRange.findIndex(m => m.value === this.minute),
                duration
            );
        }
        const secondListRef = this.secondListRef();
        if (secondListRef) {
            this.scrollTo(
                secondListRef.nativeElement,
                this.secondRange.findIndex(m => m.value === this.second),
                duration
            );
        }
    }

    ngOnDestroy(): void {
        // 关闭面板时有 0.2s 的动画，所以延迟 200ms 再重置滚动位置
        setTimeout(() => {
            this.resetScrollPosition();
        }, 200);
    }
}
