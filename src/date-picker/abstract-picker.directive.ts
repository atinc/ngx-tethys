import {
    AfterViewInit,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    ChangeDetectorRef,
    TemplateRef,
    SimpleChange
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, mapTo, takeUntil, tap } from 'rxjs/operators';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { AbstractPickerComponent } from './abstract-picker.component';
import { FunctionProp, coerceBooleanProperty } from '../util/helpers';
import { PanelMode, CompatibleValue } from './standard-types';
import { ThyPopover } from '../popover';

export abstract class PickerDirective extends AbstractPickerComponent implements AfterViewInit, OnDestroy, OnChanges {
    showWeek = false;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() thyMode: PanelMode | PanelMode[];

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
    private destroy$ = new Subject();
    private el: HTMLElement = this.elementRef.nativeElement;
    readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
        tap(e => e.stopPropagation()),
        mapTo(true)
    );

    private openOverlay(): void {
        const { componentInstance } = this.thyPopover.open(DatePopupComponent, {
            origin: this.el,
            hasBackdrop: true,
            backdropClass: 'thy-overlay-transparent-backdrop',
            offset: 10,
            initialState: {
                isRange: this.isRange,
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
            placement: 'bottomLeft'
        });
        componentInstance.valueChange
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: CompatibleValue) => this.onValueChange(event));
        componentInstance.showTimePickerChange
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: boolean) => this.onShowTimePickerChange(event));
        // tslint:disable-next-line: max-line-length
        componentInstance.ngOnChanges({ value: {} as SimpleChange }); // dynamically created components don't call ngOnChanges, manual call
    }

    closeOverlay(): void {
        this.thyPopover.close();
    }

    initActionSubscribe(): void {
        this.$click
            .pipe(
                debounceTime(50),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.openOverlay();
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
