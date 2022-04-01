import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from './date-helper.service';
import { CompatibleDate, DateEntry, ThyDateRangeEntry, ThyDateGranularity } from './standard-types';
import { getFlexibleAdvancedReadableValue, transformDateValue } from './picker.util';
import { TinyDate } from 'ngx-tethys/util';
import { AdvancedSelectableCell } from './inner-types';

@Pipe({ name: 'thyDatePickerFormat' })
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

@Pipe({ name: 'thyDatePickerFormatString' })
export class ThyDatePickerFormatStringPipe implements PipeTransform {
    constructor(private dateHelper: DateHelperService) {}

    transform(originalValue: CompatibleDate | DateEntry | ThyDateRangeEntry): string {
        const { withTime } = transformDateValue(originalValue);

        return withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
    }
}
@Pipe({ name: 'showYearTip' })
export class DatePickerAdvancedShowYearTipPipe implements PipeTransform {
    constructor() {}
    transform(value: AdvancedSelectableCell, type: ThyDateGranularity): boolean {
        return type !== 'year' && value.startValue.isSameDay(value.startValue.startOfYear());
    }
}
