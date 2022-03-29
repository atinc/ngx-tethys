import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from './date-helper.service';
import { AdvancedSelectableCell, CompatibleDate, DateEntry, RangeEntry, ThyFlexibleAdvancedDateGranularity } from './standard-types';
import { getFlexibleAdvancedReadableValue, transformDateValue } from './picker.util';
import { TinyDate } from 'ngx-tethys/util';

@Pipe({ name: 'thyDatePickerFormat' })
export class ThyDatePickerFormatPipe implements PipeTransform {
    constructor(private dateHelper: DateHelperService) {}

    transform(originalValue: CompatibleDate | DateEntry | RangeEntry, formatStr?: string): string {
        const { value, withTime, flexibleAdvancedDateGranularity } = transformDateValue(originalValue);

        if (!formatStr) {
            formatStr = withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';
        }

        if (!Array.isArray(value)) {
            return this.dateHelper.format(value, formatStr);
        } else {
            if (flexibleAdvancedDateGranularity) {
                const tinyDates = [new TinyDate(value[0]), new TinyDate(value[1])];
                return getFlexibleAdvancedReadableValue(tinyDates, flexibleAdvancedDateGranularity);
            } else {
                return value.map(date => this.dateHelper.format(date, formatStr)).join(' ~ ');
            }
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

@Pipe({ name: 'ThyDateTimeframeGranularityActivePipe' })
export class ThyDateTimeframeGranularityActivePipe implements PipeTransform {
    constructor() {}
    transform(originalValue: AdvancedSelectableCell[], value: AdvancedSelectableCell): boolean {
        return originalValue?.length && originalValue[0].type === value.type;
    }
}

@Pipe({ name: 'dateIndeterminate' })
export class ThyDateIndeterminatePipe implements PipeTransform {
    constructor() {}
    transform(originalValue: AdvancedSelectableCell[], value: AdvancedSelectableCell): boolean {
        if (originalValue[0]?.type === value.type) {
            return false;
        } else {
            if (originalValue[0]?.type === 'year') {
                return !!originalValue.find(item => item.startValue.isSameYear(value.startValue));
            } else {
                return value.type === 'year'
                    ? !!originalValue.find(item => item.startValue.isSameYear(value.startValue))
                    : !!originalValue.find(item => item.startValue.isSameQuarter(value.startValue));
            }
        }
    }
}

@Pipe({ name: 'showYearTip' })
export class ThyDatePickerAdvancedShowYearTipPipe implements PipeTransform {
    constructor() {}
    transform(value: AdvancedSelectableCell, type: ThyFlexibleAdvancedDateGranularity): boolean {
        return type !== 'year' && value.startValue.isSameDay(value.startValue.startOfYear());
    }
}
