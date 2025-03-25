import { Pipe, PipeTransform, inject } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from './date-helper.service';
import { ThyDatePickerConfigService } from './date-picker.service';
import { AdvancedSelectableCell } from './inner-types';
import { getFlexibleAdvancedReadableValue, transformDateValue } from './picker.util';
import { CompatibleDate, DateEntry, ThyDateGranularity, ThyDateRangeEntry } from './standard-types';

/**
 * @private
 */
@Pipe({
    name: 'thyDatePickerFormat',
    standalone: true
})
export class ThyDatePickerFormatPipe implements PipeTransform {
    private dateHelper = inject(DateHelperService);
    private datePickerConfigService = inject(ThyDatePickerConfigService);

    transform(originalValue: CompatibleDate | DateEntry | ThyDateRangeEntry, formatStr?: string, separator?: string): string {
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);

        if (!formatStr) {
            formatStr = withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
        }
        const currentSeparator = ` ${(separator ?? this.datePickerConfigService.separator)?.trim()} `;
        if (!Array.isArray(value)) {
            return this.dateHelper.format(value, formatStr);
        } else {
            if (flexibleDateGranularity && flexibleDateGranularity !== 'day') {
                const tinyDates = [new TinyDate(value[0]), new TinyDate(value[1])];
                return getFlexibleAdvancedReadableValue(tinyDates, flexibleDateGranularity, currentSeparator);
            } else {
                return value.map(date => this.dateHelper.format(date, formatStr)).join(currentSeparator);
            }
        }
    }
}

@Pipe({
    name: 'thyQuarterPickerFormat',
    standalone: true
})
export class ThyQuarterPickerFormatPipe implements PipeTransform {
    constructor(private datePickerConfigService: ThyDatePickerConfigService) {}

    transform(originalValue: CompatibleDate | DateEntry | ThyDateRangeEntry, formatStr?: string, separator?: string): string {
        const { value, withTime } = transformDateValue(originalValue);

        if (!formatStr) {
            formatStr = 'yyyy-qqq';
        }

        if (!value) {
            return;
        }

        if (!Array.isArray(value)) {
            const _value = new TinyDate(value);
            return _value.format(formatStr);
        } else {
            return value
                .map(date => {
                    const _date = new TinyDate(date);
                    return _date.format(formatStr);
                })
                .join(` ${(separator ?? this.datePickerConfigService.separator)?.trim()} `);
        }
    }
}

/**
 * @private
 */
@Pipe({
    name: 'thyDatePickerFormatString',
    standalone: true
})
export class ThyDatePickerFormatStringPipe implements PipeTransform {
    private dateHelper = inject(DateHelperService);

    transform(originalValue: CompatibleDate | DateEntry | ThyDateRangeEntry): string {
        const { withTime } = transformDateValue(originalValue);

        return withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
    }
}

/**
 * @private
 */
@Pipe({
    name: 'showYearTip',
    standalone: true
})
export class DatePickerAdvancedShowYearTipPipe implements PipeTransform {
    constructor() {}
    transform(value: AdvancedSelectableCell, type: ThyDateGranularity): boolean {
        return type !== 'year' && value.startValue.isSameDay(value.startValue.startOfYear());
    }
}
