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
    TemplateRef
} from '@angular/core';

import { AbstractPickerComponent } from './abstract-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { CompatibleValue, PanelMode } from './standard-types';

@Directive()
export abstract class PickerDirective extends AbstractPickerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    showWeek = false;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() thyMode: PanelMode = 'date';

    panelMode: PanelMode | PanelMode[];

    @Output() readonly thyOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : coerceBooleanProperty(value);
    }

    @Input() thyMustShowTime = false;

    @Input() thyPlacement: ThyPlacement = 'bottom';

    private offset = 4;
    @Input() set thyOffset(value: number) {
        warnDeprecation(`thyOffset parameter will be deprecated, please use thyPopoverOptions instead.`);
        this.offset = value;
    }

    private hasBackdrop = true;
    @Input() set thyHasBackdrop(value: boolean) {
        warnDeprecation(`thyHasBackdrop parameter will be deprecated, please use thyPopoverOptions instead.`);
        this.hasBackdrop = value;
    }

    @Input() thyPopoverOptions: ThyPopoverConfig;

    @Input() thyStopPropagation = true;

    private destroy$ = new Subject();
    private el: HTMLElement = this.elementRef.nativeElement;
    readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
        tap(e => {
            if (this.thyStopPropagation) {
                e.stopPropagation();
            }
        }),
        mapTo(true)
    );

    ngOnInit() {
        this.thyMode = this.thyMode || 'date';
        this.panelMode = this.isRange ? [this.thyMode, this.thyMode] : this.thyMode;
    }

    private openOverlay(): void {
        const popoverRef = this.thyPopover.open(
            DatePopupComponent,
            Object.assign(
                {
                    origin: this.el,
                    hasBackdrop: this.hasBackdrop,
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: this.offset,
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
                        maxDate: this.thyMaxDate
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
            // tslint:disable-next-line: max-line-length
            componentInstance.ngOnChanges({ value: {} as SimpleChange }); // dynamically created components don't call ngOnChanges, manual call
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

        this.closeOverlay();
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
