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
    NgZone
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { clamp } from '../util/helpers';
import { tap, pluck, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { InputBoolean } from '../core';
import { UpdateHostClassService } from '../shared';

export type ThySliderType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

@Component({
    selector: 'thy-slider',
    templateUrl: './slider.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySliderComponent),
            multi: true
        },
        UpdateHostClassService
    ]
})
export class ThySliderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
    @HostBinding('class.slider-vertical')
    @Input()
    @InputBoolean()
    thyVertical = false;

    @HostBinding('class.slider-disabled')
    @Input()
    @InputBoolean()
    thyDisabled = false;

    @HostBinding('class.thy-slider') _thySlider = true;

    @HostBinding('class.cursor-pointer') _pointer = true;

    @ViewChild('sliderRail', { static: true }) sliderRail: ElementRef;

    @ViewChild('sliderTrack', { static: true }) sliderTrack: ElementRef;

    @ViewChild('sliderPointer', { static: true }) sliderPointer: ElementRef;

    @Input() thyMax = 100;

    @Input() thyMin = 0;

    @Input() thyStep = 1;

    @Input() set thyType(type: ThySliderType) {
        this.updateHostClassService.updateClass(type ? [`thy-slider-${type}`] : []);
    }

    @Input() thyColor: string;

    @Output() thyAfterChange = new EventEmitter<{ value: number }>();

    public value: number;

    private dragStartListener: Observable<number>;

    private dragMoveListener: Observable<number>;

    private dragEndListener: Observable<Event>;

    private dragStartHandler: Subscription | null;

    private dragMoveHandler: Subscription | null;

    private dragEndHandler: Subscription | null;

    private onChangeCallback = (v: any) => {};

    private onTouchedCallback = (v: any) => {};

    constructor(
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private ref: ElementRef,
        private updateHostClassService: UpdateHostClassService
    ) {
        updateHostClassService.initializeElement(ref.nativeElement);
    }

    ngOnInit() {
        this.verificationValues();
        this.verificationStepValue();
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
        if (changes.hasOwnProperty('thyMin') || changes.hasOwnProperty('thyMax') || changes.hasOwnProperty('thyStep')) {
            this.verificationValues();
            this.verificationStepValue();
        }
    }

    ngOnDestroy() {
        this.unsubscribeMouseActions();
    }

    private verificationValues() {
        if (this.thyMin >= this.thyMax) {
            throw new Error('min value must less than max value.');
        }
    }

    private verificationStepValue() {
        if (this.thyStep <= 0 || !!!this.thyStep) {
            throw new Error('step value must be greater than 0.');
        } else if (Number.isInteger(this.thyStep) && (this.thyMax - this.thyMin) % this.thyStep) {
            throw new Error('(max -min) must be divisible by step.');
        }
    }

    private toggleDisabled() {
        if (this.thyDisabled) {
            this.unsubscribeMouseActions();
        } else {
            this.subscribeMouseActions(['start']);
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
        const orientFields: string[] = this.thyVertical ? ['height', 'top'] : ['width', 'left'];
        this.sliderTrack.nativeElement.style[orientFields[0]] = `${percentage * 100}%`;
        this.sliderPointer.nativeElement.style[orientFields[1]] = `${percentage * 100}%`;
    }

    private unsubscribeMouseActions(actions: string[] = ['start', 'move', 'end']) {
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

    private subscribeMouseActions(actions: string[] = ['start', 'move', 'end']) {
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
            this.subscribeMouseActions(['move', 'end']);
        } else {
            this.unsubscribeMouseActions(['move', 'end']);
        }
    }
    private registerMouseEventsListeners() {
        const orientField = this.thyVertical ? 'pageY' : 'pageX';

        this.dragStartListener = this.ngZone.runOutsideAngular(() => {
            return fromEvent(this.ref.nativeElement, 'mousedown').pipe(
                tap((e: Event) => {
                    e.stopPropagation();
                    e.preventDefault();
                }),
                pluck<Event, number>(orientField),
                map((position: number) => this.mousePositionToAdaptiveValue(position))
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
                pluck<Event, number>(orientField),
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
        const ratio = this.convertPointerPositionToRatio(position, sliderStartPosition, sliderLength);
        const value = this.ratioToValue(ratio);
        return parseFloat(value.toFixed(this.getDecimals(this.thyStep)));
    }

    private getSliderPagePosition(): number {
        const rect = this.ref.nativeElement.getBoundingClientRect();
        const window = this.ref.nativeElement.ownerDocument.defaultView;
        const orientFields: string[] = this.thyVertical ? ['top', 'pageYOffset'] : ['left', 'pageXOffset'];
        return rect[orientFields[0]] + window[orientFields[1]];
    }

    private getRailLength() {
        const orientFiled = this.thyVertical ? 'clientHeight' : 'clientWidth';

        return this.sliderRail.nativeElement[orientFiled];
    }

    private convertPointerPositionToRatio(pointerPosition: number, startPosition: number, totalLength: number) {
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
