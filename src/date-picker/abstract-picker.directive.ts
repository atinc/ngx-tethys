import { ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { FunctionProp, warnDeprecation } from 'ngx-tethys/util';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, mapTo, tap } from 'rxjs/operators';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    OnChanges,
    OnInit,
    output,
    SimpleChange,
    TemplateRef,
    numberAttribute,
    inject,
    OutputRefSubscription,
    input
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
export abstract class PickerDirective extends AbstractPickerComponent implements OnInit, AfterViewInit, OnChanges {
    elementRef = inject(ElementRef);

    cdr = inject(ChangeDetectorRef);

    private thyPopover = inject(ThyPopover);

    readonly thyDateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    readonly thyOnPanelChange = output<ThyPanelMode | ThyPanelMode[]>();

    readonly thyOnCalendarChange = output<Date[]>();

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    readonly thyPlacement = input<ThyPlacement>('bottom');

    /**
     * 弹出 DatePicker 的偏移量
     */
    readonly thyOffset = input(4, {
        transform: (value: number) => {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                warnDeprecation(`thyOffset parameter will be deprecated, please use thyPopoverOptions instead.`);
            }
            return numberAttribute(value);
        }
    });

    /**
     * 是否有幕布
     */
    readonly thyHasBackdrop = input(true, {
        transform: (value: boolean) => {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                warnDeprecation(`thyOffset parameter will be deprecated, please use thyPopoverOptions instead.`);
            }
            return coerceBooleanProperty(value);
        }
    });

    /**
     * popover 的其它参数
     */
    readonly thyPopoverOptions = input<ThyPopoverConfig>();

    /**
     * 是否阻止冒泡
     */
    readonly thyStopPropagation = input(true, { transform: coerceBooleanProperty });

    private el: HTMLElement = this.elementRef.nativeElement;

    readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
        tap(e => {
            if (this.thyStopPropagation()) {
                e.stopPropagation();
            }
        }),
        mapTo(true)
    );

    private valueChangeSubscription: OutputRefSubscription;

    private calendarChangeSubscription: OutputRefSubscription;

    private showTimePickerChangeSubscription: OutputRefSubscription;

    private dateValueChangeSubscription: OutputRefSubscription;

    ngOnInit() {
        this.setPanelMode();
    }

    private openOverlay(): void {
        this.setPanelMode();
        const popoverRef = this.thyPopover.open(
            DatePopup,
            Object.assign(
                {
                    origin: this.el,
                    hasBackdrop: this.thyHasBackdrop(),
                    backdropClass: 'thy-overlay-transparent-backdrop',
                    offset: this.thyOffset(),
                    outsideClosable: true,
                    initialState: {
                        isRange: this.isRange,
                        panelMode: this.panelMode,
                        showWeek: this.showWeek(),
                        value: this.thyValue,
                        showTime: this.thyShowTime(),
                        mustShowTime: this.withTime,
                        format: this.thyFormat(),
                        dateRender: this.thyDateRender(),
                        disabledDate: this.thyDisabledDate(),
                        placeholder: this.placeholder(),
                        className: this.thyPanelClassName(),
                        defaultPickerValue: this.thyDefaultPickerValue(),
                        minDate: this.thyMinDate(),
                        maxDate: this.thyMaxDate(),
                        showShortcut: this.thyShowShortcut(),
                        shortcutPresets: this.thyShortcutPresets(),
                        shortcutPosition: this.thyShortcutPosition(),
                        flexible: this.flexible(),
                        flexibleDateGranularity: this.flexibleDateGranularity,
                        timestampPrecision: this.thyTimestampPrecision()
                    },
                    placement: this.thyPlacement()
                },
                this.thyPopoverOptions()
            )
        );
        if (popoverRef) {
            const componentInstance = popoverRef.componentInstance;

            if (this.valueChangeSubscription) {
                this.valueChangeSubscription.unsubscribe();
            }
            this.valueChangeSubscription = componentInstance.valueChange?.subscribe((event: CompatibleValue) => this.onValueChange(event));

            if (this.calendarChangeSubscription) {
                this.calendarChangeSubscription.unsubscribe();
            }
            this.calendarChangeSubscription = componentInstance.calendarChange?.subscribe((event: CompatibleValue) => {
                const rangeValue = coerceArray(event).map(x => x.nativeDate);
                this.thyOnCalendarChange.emit(rangeValue);
            });

            if (this.showTimePickerChangeSubscription) {
                this.showTimePickerChangeSubscription.unsubscribe();
            }
            this.showTimePickerChangeSubscription = componentInstance.showTimePickerChange?.subscribe((event: boolean) =>
                this.onShowTimePickerChange(event)
            );

            // eslint-disable-next-line max-len
            componentInstance.ngOnChanges({ value: {} as SimpleChange }); // dynamically created components don't call ngOnChanges, manual call

            if (this.dateValueChangeSubscription) {
                this.dateValueChangeSubscription.unsubscribe();
            }
            this.dateValueChangeSubscription = componentInstance.dateValueChange?.subscribe((event: ThyDateChangeEvent) => {
                this.thyDateChange.emit(event);
            });

            popoverRef
                .afterOpened()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.thyOpenChange.emit(true));
            popoverRef
                .afterClosed()
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.thyOpenChange.emit(false));
        }
    }

    closeOverlay(): void {
        this.thyPopover.close();
    }

    initActionSubscribe(): void {
        this.$click.pipe(debounceTime(50), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (!this.thyDisabled && !this.thyReadonly()) {
                this.openOverlay();
            }
        });
    }

    ngAfterViewInit(): void {
        this.initActionSubscribe();
    }

    ngOnDestroy(): void {
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
        if (this.calendarChangeSubscription) {
            this.calendarChangeSubscription.unsubscribe();
        }
        if (this.showTimePickerChangeSubscription) {
            this.showTimePickerChangeSubscription.unsubscribe();
        }
        if (this.dateValueChangeSubscription) {
            this.dateValueChangeSubscription.unsubscribe();
        }
    }

    onValueChange(value: CompatibleValue): void {
        this.restoreTimePickerState(value);
        super.onValueChange(value);
        if (!this.flexible()) {
            this.closeOverlay();
        }
    }

    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }
}
