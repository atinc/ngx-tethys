import { ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { coerceBooleanProperty, FunctionProp, warnDeprecation } from 'ngx-tethys/util';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, mapTo, takeUntil, tap } from 'rxjs/operators';

import { coerceArray } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    TemplateRef,
    booleanAttribute,
    numberAttribute
} from '@angular/core';

import { AbstractPickerComponent } from './abstract-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyDateChangeEvent, ThyPanelMode } from './standard-types';
import { CompatibleValue } from './inner-types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * @private
 */
@Directive()
export abstract class PickerDirective extends AbstractPickerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    showWeek = false;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;

    panelMode: ThyPanelMode | ThyPanelMode[];

    /**
     * @type EventEmitter<ThyPanelMode | ThyPanelMode[]>
     */
    @Output() readonly thyOnPanelChange = new EventEmitter<ThyPanelMode | ThyPanelMode[]>();

    /**
     * @type EventEmitter<Date[]>
     */
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : coerceBooleanProperty(value);
    }

    /**
     * 是否展示时间(时、分)
     * @default false
     */
    @Input({ transform: booleanAttribute }) thyMustShowTime = false;

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    @Input() thyPlacement: ThyPlacement = 'bottom';

    private offset = 4;

    /**
     * 弹出 DatePicker 的偏移量
     * @default 4
     */
    @Input({ transform: numberAttribute })
    set thyOffset(value: number) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation(`thyOffset parameter will be deprecated, please use thyPopoverOptions instead.`);
        }
        this.offset = value;
    }

    private hasBackdrop = true;

    /**
     * 是否有幕布
     * @default true
     */
    @Input({ transform: booleanAttribute })
    set thyHasBackdrop(value: boolean) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation(`thyHasBackdrop parameter will be deprecated, please use thyPopoverOptions instead.`);
        }
        this.hasBackdrop = value;
    }

    /**
     * popover 的其它参数
     */
    @Input() thyPopoverOptions: ThyPopoverConfig;

    /**
     * 是否阻止冒泡
     */
    @Input({ transform: booleanAttribute }) thyStopPropagation = true;

    private destroy$ = new Subject<void>();
    private el: HTMLElement = this.elementRef.nativeElement;
    readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
        tap(e => {
            if (this.thyStopPropagation) {
                e.stopPropagation();
            }
        }),
        mapTo(true)
    );

    takeUntilDestroyed = takeUntilDestroyed();

    ngOnInit() {
        this.getInitialState();
    }

    private getInitialState() {
        this.thyMode = this.thyMode || 'date';
        this.flexible = this.thyMode === 'flexible';

        if (this.isRange) {
            this.panelMode = this.flexible ? ['date', 'date'] : [this.thyMode, this.thyMode];
        } else {
            this.panelMode = this.thyMode;
        }
        this.showWeek = this.thyMode === 'week';
    }

    private openOverlay(): void {
        this.getInitialState();
        const popoverRef = this.thyPopover.open(
            DatePopup,
            Object.assign(
                {
                    origin: this.el,
                    hasBackdrop: this.hasBackdrop,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: this.offset,
                    outsideClosable: true,
                    initialState: {
                        isRange: this.isRange,
                        panelMode: this.panelMode,
                        showWeek: this.showWeek,
                        value: this.thyValue,
                        showTime: this.thyShowTime,
                        mustShowTime: this.withTime,
                        format: this.thyFormat,
                        dateRender: this.thyDateRender,
                        disabledDate: this.thyDisabledDate,
                        placeholder: this.thyPlaceHolder,
                        className: this.thyPanelClassName,
                        defaultPickerValue: this.thyDefaultPickerValue,
                        minDate: this.thyMinDate,
                        maxDate: this.thyMaxDate,
                        showShortcut: this.thyShowShortcut,
                        shortcutPresets: this.shortcutPresets,
                        shortcutPosition: this.shortcutPosition,
                        flexible: this.flexible,
                        flexibleDateGranularity: this.flexibleDateGranularity
                    },
                    placement: this.thyPlacement
                },
                this.thyPopoverOptions
            )
        );
        if (popoverRef) {
            const componentInstance = popoverRef.componentInstance;
            componentInstance.valueChange.pipe(takeUntil(this.destroy$)).subscribe((event: CompatibleValue) => this.onValueChange(event));
            componentInstance.calendarChange.pipe(takeUntil(this.destroy$)).subscribe((event: CompatibleValue) => {
                const rangeValue = coerceArray(event).map(x => x.nativeDate);
                this.thyOnCalendarChange.emit(rangeValue);
            });
            componentInstance.showTimePickerChange
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: boolean) => this.onShowTimePickerChange(event));
            // eslint-disable-next-line max-len
            componentInstance.ngOnChanges({ value: {} as SimpleChange }); // dynamically created components don't call ngOnChanges, manual call
            componentInstance.dateValueChange?.pipe(this.takeUntilDestroyed).subscribe((event: ThyDateChangeEvent) => {
                this.thyDateChange.emit(event);
            });
            popoverRef
                .afterOpened()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.thyOpenChange.emit(true));
            popoverRef
                .afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.thyOpenChange.emit(false));
        }
    }

    closeOverlay(): void {
        this.thyPopover.close();
    }

    initActionSubscribe(): void {
        this.$click.pipe(debounceTime(50), takeUntil(this.destroy$)).subscribe(() => {
            if (!this.thyDisabled && !this.thyReadonly) {
                this.openOverlay();
            }
        });
    }

    constructor(public elementRef: ElementRef, public cdr: ChangeDetectorRef, private thyPopover: ThyPopover) {
        super(cdr);
    }

    ngAfterViewInit(): void {
        this.setDefaultTimePickerState();
        this.initActionSubscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onValueChange(value: CompatibleValue): void {
        this.restoreTimePickerState(value);
        super.onValueChange(value);
        if (!this.flexible) {
            this.closeOverlay();
        }
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState() {
        this.withTime = this.thyMustShowTime;
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime || this.originWithTime;
        }
    }
    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }
}
