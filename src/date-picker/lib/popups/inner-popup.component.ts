import { ChangeDetectionStrategy, Component, model, input, output, Signal, TemplateRef, inject, effect } from '@angular/core';
import { FunctionProp, TinyDate, coerceBooleanProperty } from 'ngx-tethys/util';
import { DateHelperService } from '../../date-helper.service';
import { RangePartType } from '../../inner-types';
import { isAfterMoreThanLessOneYear, isAfterMoreThanOneDecade, isAfterMoreThanOneMonth, isAfterMoreThanOneYear } from '../../picker.util';
import { DisabledDateFn, ThyPanelMode } from '../../standard-types';
import { DateHeader } from '../date/date-header.component';
import { DateTable } from '../date/date-table.component';
import { ThyDatePickerLocale, injectLocale } from 'ngx-tethys/i18n';
import { ThyInputDirective } from 'ngx-tethys/input';
import { DecadeHeader } from '../decade/decade-header.component';
import { DecadeTable } from '../decade/decade-table.component';
import { MonthHeader } from '../month/month-header.component';
import { MonthTable } from '../month/month-table.component';
import { QuarterTable } from '../quarter/quarter-table.component';
import { YearHeader } from '../year/year-header.component';
import { YearTable } from '../year/year-table.component';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'inner-popup',
    exportAs: 'innerPopup',
    templateUrl: 'inner-popup.component.html',
    imports: [
        ThyInputDirective,
        DecadeHeader,
        DecadeTable,
        YearHeader,
        YearTable,
        MonthHeader,
        MonthTable,
        QuarterTable,
        DateHeader,
        DateTable
    ],
    host: {
        class: 'thy-calendar-picker-inner-popup',
        '[class.thy-calendar-picker-inner-popup-with-range-input]': 'showDateRangeInput()'
    }
})
export class InnerPopup {
    private dateHelper = inject(DateHelperService);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    readonly showWeek = input(false, { transform: coerceBooleanProperty });

    readonly isRange = input(false, { transform: coerceBooleanProperty });

    readonly activeDate = model<TinyDate>();

    readonly rangeActiveDate = input<TinyDate[]>(); // Range ONLY

    readonly disabledDate = input<DisabledDateFn>();

    readonly dateRender = input<FunctionProp<TemplateRef<Date> | string>>();

    readonly selectedValue = input<TinyDate[]>(); // Range ONLY

    readonly hoverValue = input<TinyDate[]>(); // Range ONLY

    readonly panelMode = input(null, {
        transform: (value: ThyPanelMode | 'time') => {
            if (value === 'time') {
                return 'date';
            }
            return value;
        }
    });

    readonly timeZone = input<string>();

    readonly showDateRangeInput = input(false, { transform: coerceBooleanProperty });

    readonly partType = input<RangePartType>();

    readonly endPanelMode = input<ThyPanelMode>();

    readonly value = model<TinyDate>();

    readonly panelModeChange = output<ThyPanelMode>();

    readonly headerChange = output<TinyDate>();

    readonly selectDate = output<TinyDate>();

    readonly dayHover = output<TinyDate>();

    prefixCls = 'thy-calendar';

    constructor() {
        effect(() => {
            if (!this.activeDate()) {
                this.activeDate.set(new TinyDate(undefined, this.timeZone()));
            }
        });
    }

    getReadableValue(value: TinyDate) {
        return value ? this.dateHelper.format(value.nativeDate, 'yyyy-MM-dd') : '';
    }

    onSelectDate(date: TinyDate): void {
        const value = date instanceof TinyDate ? date : new TinyDate(date, this.timeZone());
        this.selectDate.emit(value);
    }

    onChooseMonth(value: TinyDate): void {
        const activeDate = this.activeDate().setMonth(value.getMonth());
        const endPanelMode = this.endPanelMode();

        this.activeDate.set(activeDate);
        if (endPanelMode === 'month') {
            this.value.set(value);
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(endPanelMode);
        }
    }

    onChooseQuarter(value: TinyDate): void {
        const activeDate = this.activeDate().setQuarter(value.getQuarter());
        const endPanelMode = this.endPanelMode();

        this.activeDate.set(activeDate);
        if (endPanelMode === 'quarter') {
            this.value.set(value);
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(endPanelMode);
        }
    }

    onChooseYear(value: TinyDate): void {
        const activeDate = this.activeDate().setYear(value.getYear());
        const endPanelMode = this.endPanelMode();

        this.activeDate.set(activeDate);
        if (endPanelMode === 'year') {
            this.value.set(value);
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(endPanelMode);
        }
    }

    onChooseDecade(value: TinyDate): void {
        const activeDate = this.activeDate().setYear(value.getYear());
        const endPanelMode = this.endPanelMode();

        this.activeDate.set(activeDate);
        if (endPanelMode === 'decade') {
            this.value.set(value);
            this.selectDate.emit(value);
        } else {
            this.headerChange.emit(value);
            this.panelModeChange.emit('year');
        }
    }

    enablePrevNext(direction: 'prev' | 'next', mode: ThyPanelMode): boolean {
        if (this.isRange()) {
            const partType = this.partType();
            if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
                const [headerLeftDate, headerRightDate] = this.rangeActiveDate();
                return isAfterMoreThanOneMonth(headerRightDate, headerLeftDate);
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    enableSuperPrevNext(direction: 'prev' | 'next', panelMode: ThyPanelMode) {
        if (this.isRange()) {
            const partType = this.partType();
            if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
                const [headerLeftDate, headerRightDate] = this.rangeActiveDate();
                if (panelMode === 'date') {
                    return isAfterMoreThanLessOneYear(headerRightDate, headerLeftDate);
                } else if (panelMode === 'month' || panelMode === 'quarter') {
                    return isAfterMoreThanOneYear(headerRightDate, headerLeftDate);
                } else if (panelMode === 'year') {
                    return isAfterMoreThanOneDecade(headerRightDate, headerLeftDate);
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
