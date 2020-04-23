import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from './date-helper.service';
import { CompatibleDate, DateEntry, RangeEntry } from './standard-types';
import { transformDateValue } from './picker.util';

@Pipe({ name: 'thyDatePickerFormat' })
export class ThyDatePickerFormatPipe implements PipeTransform {
    constructor(private dateHelper: DateHelperService) {}

    transform(originalValue: CompatibleDate | DateEntry | RangeEntry, formatStr?: string): string {
        const { value, withTime } = transformDateValue(originalValue);

        if (!formatStr) {
            formatStr = withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
        }

        if (!Array.isArray(value)) {
            return this.dateHelper.format(value, formatStr);
        } else {
            return value.map(date => this.dateHelper.format(date, formatStr)).join(' ~ ');
        }
    }
}

@Pipe({ name: 'thyDatePickerFormatString' })
export class ThyDatePickerFormatStringPipe implements PipeTransform {
    constructor(private dateHelper: DateHelperService) {}

    transform(originalValue: CompatibleDate | DateEntry | RangeEntry): string {
        const { withTime } = transformDateValue(originalValue);

        return withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
    }
}
