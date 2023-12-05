import { Pipe, PipeTransform } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { DateHelperService } from './date-helper.service';
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
    constructor(private dateHelper: DateHelperService) {}

    transform(originalValue: CompatibleDate | DateEntry | ThyDateRangeEntry, formatStr?: string): string {
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);

        if (!formatStr) {
            formatStr = withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
        }

        if (!Array.isArray(value)) {
            return this.dateHelper.format(value, formatStr);
        } else {
            if (flexibleDateGranularity && flexibleDateGranularity !== 'day') {
                const tinyDates = [new TinyDate(value[0]), new TinyDate(value[1])];
                return getFlexibleAdvancedReadableValue(tinyDates, flexibleDateGranularity);
            } else {
                return value.map(date => this.dateHelper.format(date, formatStr)).join(' ~ ');
            }
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
    constructor(private dateHelper: DateHelperService) {}

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
