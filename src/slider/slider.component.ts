import {
    Component,
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    SimpleChanges,
    forwardRef,
    Input,
    EventEmitter,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
    HostBinding,
    Output,
    NgZone,
    numberAttribute,
    inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { clamp, coerceBooleanProperty } from 'ngx-tethys/util';
import { tap, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { NgStyle } from '@angular/common';

export type ThySliderType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

export type ThySliderSize = 'sm' | 'md' | 'lg';

/**
 * 滑动输入条组件
 * @name thy-slider
 * @order 10
 */
@Component({
    selector: 'thy-slider',
    templateUrl: './slider.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySlider),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': `tabIndex`
    },
    imports: [NgStyle]
})
export class ThySlider
    extends TabIndexDisabledControlValueAccessorMixin
    implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor
{
    private cdr = inject(ChangeDetectorRef);
    private ngZone = inject(NgZone);
    private ref = inject(ElementRef);

    /**
     * 是否切换为纵轴模式
     */
    @HostBinding('class.slider-vertical')
    @Input({ transform: coerceBooleanProperty })
    thyVertical = false;

    /**
     * 是否禁用
     */
    @HostBinding('class.slider-disabled')
    @Input({ transform: coerceBooleanProperty })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
        this.toggleDisabled();
    }
    override get thyDisabled(): boolean {
        return this.disabled;
    }

    disabled = false;

    @HostBinding('class.thy-slider') _thySlider = true;

    @HostBinding('class.cursor-pointer') _pointer = true;

    @ViewChild('sliderRail', { static: true }) sliderRail: ElementRef;

    @ViewChild('sliderTrack', { static: true }) sliderTrack: ElementRef;

    @ViewChild('sliderPointer', { static: true }) sliderPointer: ElementRef;

    /**
     * 最大值
     */
    @Input({ transform: numberAttribute }) thyMax = 100;

    /**
     * 最小值
     */
    @Input({ transform: numberAttribute }) thyMin = 0;

    /**
     * 步长，需要被 thyMax - thyMin 的差值整除。
     */
    @Input({ transform: numberAttribute }) thyStep = 1;

    /**
     * 切换主题类型
     * @type primary | success | info | warning | danger
     * @default success
     */
    @Input() set thyType(type: ThySliderType) {
        if (type) {
            if (this.typeClassName) {
                this.hostRenderer.removeClass(this.typeClassName);
            }
            this.hostRenderer.addClass(type ? `thy-slider-${type}` : '');
            this.typeClassName = `thy-slider-${type}`;
        }
    }

    /**
     * 通过变量设置颜色
     */
    @Input() thyColor: string;

    /**
     * 滑动输入条大小
     * @type sm | md | lg
     * @default sm
     */
    @Input() set thySize(size: ThySliderSize) {
        if (size) {
            if (this.sizeClassName) {
                this.hostRenderer.removeClass(this.sizeClassName);
            }
            this.hostRenderer.addClass(size ? `thy-slider-${size}` : '');
            this.sizeClassName = `thy-slider-${size}`;
        }
    }

    /**
     * 移动结束后的回调，参数为当前值
     */
    @Output() thyAfterChange = new EventEmitter<{ value: number }>();

    public value: number;

    private typeClassName = '';

    private sizeClassName = '';

    private dragStartListener: Observable<number>;

    private dragMoveListener: Observable<number>;

    private dragEndListener: Observable<Event>;

    private dragStartHandler: Subscription | null;

    private dragMoveHandler: Subscription | null;

    private dragEndHandler: Subscription | null;

    private hostRenderer = useHostRenderer();

    private onChangeCallback = (v: any) => {};

    private onTouchedCallback = (v: any) => {};

    constructor() {
        super();
    }

    ngOnInit() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            verifyMinAndMax(this);
            verifyStepValues(this);
        }

        this.toggleDisabled();
        if (this.value === null || this.value === undefined) {
            this.setValue(this.ensureValueInRange(null));
        }
    }

    ngAfterViewInit() {
        this.registerMouseEventsListeners();
        this.toggleDisabled();
    }

    writeValue(newValue: number) {
        this.setValue(this.ensureValueInRange(newValue));
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (changes.hasOwnProperty('thyMin') || changes.hasOwnProperty('thyMax') || changes.hasOwnProperty('thyStep')) {
                verifyMinAndMax(this);
                verifyStepValues(this);
            }
        }
    }

    ngOnDestroy() {
        this.unsubscribeMouseListeners();
    }

    private toggleDisabled() {
        if (this.thyDisabled) {
            this.unsubscribeMouseListeners();
        } else {
            this.subscribeMouseListeners(['start']);
        }
    }

    private setValue(value: number) {
        if (this.value !== value) {
            this.value = value;
            this.updateTrackAndPointer();
        }
        this.onChangeCallback(this.value);
    }

    private ensureValueInRange(value: number): number {
        if (!this.valueMustBeValid(value)) {
            return this.thyMin;
        }
        return clamp(value, this.thyMin, this.thyMax);
    }

    private valueMustBeValid(value: number): boolean {
        return !isNaN(typeof value !== 'number' ? parseFloat(value) : value);
    }

    private updateTrackAndPointer() {
        const offset = this.valueToOffset(this.value);
        this.updateStyle(offset / 100);
        this.cdr.markForCheck();
    }

    private valueToOffset(value: number): number {
        return ((value - this.thyMin) * 100) / (this.thyMax - this.thyMin);
    }

    private updateStyle(offsetPercentage: number) {
        const percentage = Math.min(1, Math.max(0, offsetPercentage));
        const orientFields: string[] = this.thyVertical ? ['height', 'bottom'] : ['width', 'left'];
        this.sliderTrack.nativeElement.style[orientFields[0]] = `${percentage * 100}%`;
        this.sliderPointer.nativeElement.style[orientFields[1]] = `${percentage * 100}%`;
    }

    private unsubscribeMouseListeners(actions: string[] = ['start', 'move', 'end']) {
        if (actions.includes('start') && this.dragStartHandler) {
            this.dragStartHandler.unsubscribe();
            this.dragStartHandler = null;
        }
        if (actions.includes('move') && this.dragMoveHandler) {
            this.dragMoveHandler.unsubscribe();
            this.dragMoveHandler = null;
        }
        if (actions.includes('end') && this.dragEndHandler) {
            this.dragEndHandler.unsubscribe();
            this.dragEndHandler = null;
        }
    }

    private subscribeMouseListeners(actions: string[] = ['start', 'move', 'end']) {
        if (actions.includes('start') && this.dragStartListener && !this.dragStartHandler) {
            this.dragStartHandler = this.dragStartListener.subscribe(this.mouseStartMoving.bind(this));
        }

        if (actions.includes('move') && this.dragMoveListener && !this.dragMoveHandler) {
            this.dragMoveHandler = this.dragMoveListener.subscribe(this.mouseMoving.bind(this));
        }

        if (actions.includes('end') && this.dragEndListener && !this.dragEndHandler) {
            this.dragEndHandler = this.dragEndListener.subscribe(this.mouseStopMoving.bind(this));
        }
    }

    private mouseStartMoving(value: number) {
        this.pointerController(true);
        this.setValue(value);
    }

    private mouseMoving(value: number) {
        this.setValue(this.ensureValueInRange(value));
        this.cdr.markForCheck();
    }

    private mouseStopMoving(): void {
        this.pointerController(false);
        this.cdr.markForCheck();
        this.thyAfterChange.emit({ value: this.value });
    }

    private pointerController(movable: boolean) {
        if (movable) {
            this.subscribeMouseListeners(['move', 'end']);
        } else {
            this.unsubscribeMouseListeners(['move', 'end']);
        }
    }
    private registerMouseEventsListeners() {
        const orientField = this.thyVertical ? 'pageY' : 'pageX';

        this.dragStartListener = this.ngZone.runOutsideAngular(() => {
            return fromEvent(this.ref.nativeElement, 'mousedown').pipe(
                pluck(orientField),
                map((position: number, index) => this.mousePositionToAdaptiveValue(position))
            );
        });

        this.dragEndListener = this.ngZone.runOutsideAngular(() => {
            return fromEvent(document, 'mouseup');
        });

        this.dragMoveListener = this.ngZone.runOutsideAngular(() => {
            return fromEvent(document, 'mousemove').pipe(
                tap((e: Event) => {
                    e.stopPropagation();
                    e.preventDefault();
                }),
                pluck(orientField),
                distinctUntilChanged(),
                map((position: number) => this.mousePositionToAdaptiveValue(position)),
                distinctUntilChanged(),
                takeUntil(this.dragEndListener)
            );
        });
    }

    private mousePositionToAdaptiveValue(position: number): number {
        const sliderStartPosition = this.getSliderPagePosition();
        const sliderLength = this.getRailLength();
        if (!sliderLength) {
            return this.value;
        }
        const ratio = this.convertPointerPositionToRatio(position, sliderStartPosition, sliderLength);
        const value = this.ratioToValue(ratio);
        return parseFloat(value.toFixed(this.getDecimals(this.thyStep)));
    }

    private getSliderPagePosition(): number {
        const rect = this.ref.nativeElement.getBoundingClientRect();
        const window = this.ref.nativeElement.ownerDocument.defaultView;
        const orientFields: string[] = this.thyVertical ? ['bottom', 'pageYOffset'] : ['left', 'pageXOffset'];
        return rect[orientFields[0]] + window[orientFields[1]];
    }

    private getRailLength() {
        const orientFiled = this.thyVertical ? 'clientHeight' : 'clientWidth';

        return this.sliderRail.nativeElement[orientFiled];
    }

    private convertPointerPositionToRatio(pointerPosition: number, startPosition: number, totalLength: number) {
        if (this.thyVertical) {
            return clamp((startPosition - pointerPosition) / totalLength, 0, 1);
        }
        return clamp((pointerPosition - startPosition) / totalLength, 0, 1);
    }

    private ratioToValue(ratio: number) {
        let value = (this.thyMax - this.thyMin) * ratio + this.thyMin;
        const step = this.thyStep;
        if (ratio === 0) {
            value = this.thyMin;
        } else if (ratio === 1) {
            value = this.thyMax;
        } else {
            value = Math.round(value / step) * step;
        }
        return clamp(value, this.thyMin, this.thyMax);
    }

    private getDecimals(value: number): number {
        const valueString = value.toString();
        const integerLength = valueString.indexOf('.') + 1;
        return integerLength >= 0 ? valueString.length - integerLength : 0;
    }
}

// Note: keep `verifyMinAndMax` and `verifyStepValues` as separate functions (not as class properties)
// so they're tree-shakable in production mode.

function verifyMinAndMax(ctx: ThySlider): void | never {
    if (ctx.thyMin >= ctx.thyMax) {
        throw new Error('min value must less than max value.');
    }
}

function verifyStepValues(ctx: ThySlider): void | never {
    if (ctx.thyStep <= 0 || !ctx.thyStep) {
        throw new Error('step value must be greater than 0.');
    } else if (Number.isInteger(ctx.thyStep) && (ctx.thyMax - ctx.thyMin) % ctx.thyStep) {
        throw new Error('(max - min) must be divisible by step.');
    }
}
