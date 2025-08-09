import { ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { FunctionProp, warnDeprecation } from 'ngx-tethys/util';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    computed,
    input,
    output,
    DestroyRef,
    TemplateRef,
    numberAttribute,
    inject
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
export abstract class PickerDirective extends AbstractPickerComponent implements AfterViewInit {
    elementRef = inject(ElementRef);
    cdr: ChangeDetectorRef;
    private thyPopover = inject(ThyPopover);

    readonly showWeek = computed<boolean>(() => this.thyMode() === 'week');

    readonly thyDateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    readonly panelMode = computed<ThyPanelMode | ThyPanelMode[]>(() => {
        const mode = this.thyMode();
        if (this.isRange()) {
            return this.flexible() ? ['date', 'date'] : [mode, mode];
        }
        return mode;
    });

    readonly thyOnPanelChange = output<ThyPanelMode | ThyPanelMode[]>();

    readonly thyOnCalendarChange = output<Date[]>();

    readonly thyShowTime = input(false, {
        transform: (value: object | boolean) => {
            return typeof value === 'object' ? value : coerceBooleanProperty(value);
        }
    });

    /**
     * 是否展示时间(时、分)
     */
    readonly thyMustShowTime = input(false, { transform: coerceBooleanProperty });

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
            return numberAttribute(value) || 4;
        }
    });

    /**
     * 是否有幕布
     */
    readonly thyHasBackdrop = input(true, {
        transform: value => {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                warnDeprecation(`thyHasBackdrop parameter will be deprecated, please use thyPopoverOptions instead.`);
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

    private destroyRef = inject(DestroyRef);

    private el: HTMLElement = this.elementRef.nativeElement;

    readonly $click: Observable<boolean> = fromEvent(this.el, 'click').pipe(
        tap(e => {
            if (this.thyStopPropagation()) {
                e.stopPropagation();
            }
        }),
        map(() => true)
    );

    takeUntilDestroyed = takeUntilDestroyed();

    private openOverlay(): void {
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
                        isRange: this.isRange(),
                        panelMode: this.panelMode(),
                        showWeek: this.showWeek(),
                        value: this.thyValue(),
                        showTime: this.thyShowTime(),
                        mustShowTime: this.withTime,
                        format: this.thyFormat(),
                        dateRender: this.thyDateRender(),
                        disabledDate: this.thyDisabledDate(),
                        placeholder: this.thyPlaceHolder(),
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

            outputToObservable(componentInstance.valueChange)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: CompatibleValue) => this.onValueChange(event));

            outputToObservable(componentInstance.calendarChange)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: CompatibleValue) => {
                    const rangeValue = coerceArray(event).map(x => x.nativeDate);
                    this.thyOnCalendarChange.emit(rangeValue);
                });

            outputToObservable(componentInstance.showTimePickerChange)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: boolean) => this.onShowTimePickerChange(event));

            // eslint-disable-next-line max-len
            // componentInstance.ngOnChanges({ value: {} as SimpleChange }); // dynamically created components don't call ngOnChanges, manual call
            outputToObservable(componentInstance.dateValueChange)
                ?.pipe(this.takeUntilDestroyed)
                .subscribe((event: ThyDateChangeEvent) => {
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
        this.setDefaultTimePickerState();
        this.initActionSubscribe();
    }

    onValueChange(value: CompatibleValue): void {
        this.restoreTimePickerState(value);
        super.onValueChange(value);
        if (!this.flexible()) {
            this.closeOverlay();
        }
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState() {
        this.withTime = this.thyMustShowTime();
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime() || this.originWithTime;
        }
    }
    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }
}
