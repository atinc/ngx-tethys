import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValid } from 'date-fns';
import { InputBoolean, reqAnimFrame } from 'ngx-tethys/core';
import { TinyDate } from 'ngx-tethys/util';
import { ThyButtonComponent } from 'ngx-tethys/button';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

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
            useExisting: forwardRef(() => ThyTimePanelComponent)
        }
    ],
    host: {
        class: 'thy-time-picker-panel',
        '[class.thy-time-picker-panel-has-bottom-operation]': `thyShowOperations`,
        '[class.thy-time-picker-panel-columns-2]': `showColumnCount === 2`,
        '[class.thy-time-picker-panel-columns-3]': `showColumnCount === 3`
    },
    standalone: true,
    imports: [NgIf, NgFor, ThyButtonComponent, DecimalPipe]
})
export class ThyTimePanelComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild('hourListElement', { static: false }) hourListRef: ElementRef<HTMLElement>;

    @ViewChild('minuteListElement', { static: false }) minuteListRef: ElementRef<HTMLElement>;

    @ViewChild('secondListElement', { static: false }) secondListRef: ElementRef<HTMLElement>;

    /**
     * 展示的日期格式，支持 'HH:mm:ss' | 'HH:mm' | 'mm:ss'
     * @type string
     * @default HH:mm:ss
     */
    @Input() set thyFormat(value: string) {
        if (value) {
            const formatSet = new Set(value);
            this.showHourColumn = formatSet.has('H') || formatSet.has('h');
            this.showMinuteColumn = formatSet.has('m');
            this.showSecondColumn = formatSet.has('s');
        } else {
            this.showHourColumn = true;
            this.showMinuteColumn = true;
            this.showSecondColumn = true;
        }
        this.showColumnCount = [this.showHourColumn, this.showMinuteColumn, this.showSecondColumn].filter(m => m).length;
        this.cdr.markForCheck();
    }

    /**
     * 小时间隔步长
     * @type number
     */
    @Input() thyHourStep: number = 1;

    /**
     * 分钟间隔步长
     * @type number
     */
    @Input() thyMinuteStep: number = 1;

    /**
     * 秒间隔步长
     * @type number
     */
    @Input() thySecondStep: number = 1;

    /**
     * 展示选择此刻
     * @type boolean
     */
    @Input() @InputBoolean() thyShowSelectNow = true;

    /**
     * 展示底部操作
     * @type boolean
     */
    @Input() @InputBoolean() thyShowOperations = true;

    /**
     * 选择时间触发的事件
     * @type EventEmitter<Date>
     */
    @Output() thyPickChange = new EventEmitter<Date>();

    /**
     * 关闭面板事件
     * @type EventEmitter<void>
     */
    @Output() thyClosePanel = new EventEmitter<void>();

    // margin-top + 1px border
    SCROLL_OFFSET_SPACING = 5;

    SCROLL_DEFAULT_DURATION = 120;

    prefixCls = 'thy-time-picker-panel';

    hourRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    minuteRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    secondRange: ReadonlyArray<{ value: number; disabled: boolean }> = [];

    showHourColumn = true;

    showMinuteColumn = true;

    showSecondColumn = true;

    showColumnCount: number = 3;

    value: Date;

    hour: number;

    minute: number;

    second: number;

    initialScrollPosition: boolean;

    onValueChangeFn: (val: Date) => void = () => void 0;

    onTouchedFn: () => void = () => void 0;

    constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

    ngOnInit(): void {
        this.generateTimeRange();
        this.initialValue();
        setTimeout(() => {
            this.initialScrollPosition = true;
        });
    }

    generateTimeRange() {
        this.hourRange = this.buildTimeRange(24, this.thyHourStep);
        this.minuteRange = this.buildTimeRange(60, this.thyMinuteStep);
        this.secondRange = this.buildTimeRange(60, this.thySecondStep);
    }

    pickHours(hours: { value: number; disabled: boolean }, index: number) {
        this.value.setHours(hours.value);
        this.hour = hours.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.hourListRef.nativeElement, index);
    }

    pickMinutes(minutes: { value: number; disabled: boolean }, index: number) {
        this.value.setMinutes(minutes.value);
        this.minute = minutes.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.minuteListRef.nativeElement, index);
    }

    pickSeconds(seconds: { value: number; disabled: boolean }, index: number) {
        this.value.setSeconds(seconds.value);
        this.second = seconds.value;
        this.thyPickChange.emit(this.value);
        this.scrollTo(this.secondListRef.nativeElement, index);
    }

    selectNow() {
        this.value = new Date();
        this.setHMSProperty();
        this.thyPickChange.emit(this.value);
        this.thyClosePanel.emit();
    }

    confirmPickTime() {
        this.onValueChangeFn(this.value || new Date());
        this.thyClosePanel.emit();
    }

    scrollTo(container: HTMLElement, index: number = 0, duration: number = this.SCROLL_DEFAULT_DURATION) {
        const offsetTop = (container.children[index] as HTMLElement).offsetTop - this.SCROLL_OFFSET_SPACING;
        this.runScrollAnimationFrame(container, offsetTop, duration);
    }

    writeValue(value: Date | number): void {
        if (value && isValid(value)) {
            this.value = new Date(value);
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

    trackByFn(index: number): number {
        return index;
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
        if (this.hourListRef) {
            this.hourListRef.nativeElement.scrollTop = 0;
        }
        if (this.minuteListRef) {
            this.minuteListRef.nativeElement.scrollTop = 0;
        }
        if (this.secondListRef) {
            this.secondListRef.nativeElement.scrollTop = 0;
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
        if (this.hourListRef) {
            this.scrollTo(
                this.hourListRef.nativeElement,
                this.hourRange.findIndex(m => m.value === this.hour),
                duration
            );
        }
        if (this.minuteListRef) {
            this.scrollTo(
                this.minuteListRef.nativeElement,
                this.minuteRange.findIndex(m => m.value === this.minute),
                duration
            );
        }
        if (this.secondListRef) {
            this.scrollTo(
                this.secondListRef.nativeElement,
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
