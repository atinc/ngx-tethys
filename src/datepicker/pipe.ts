import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DatepickerValueEntry } from './i.datepicker';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { datepickerUtilConvertToDatepickerObject } from './util';
registerLocaleData(localeZhHans, 'zh-Hans');

@Pipe({ name: 'thyDatepickerFormat' })
export class ThyDatepickerFormatPipe implements PipeTransform {

    dataPipe = new DatePipe('zh-Hans');

    transform(value: DatepickerValueEntry, exponent?: string): string {
        let _res;

        if (value) {
            const _value = datepickerUtilConvertToDatepickerObject(value);
            const _formatRule = ['yyyy-MM-dd'];
            if (_value.with_time) {
                _formatRule.push('HH:mm');
            }
            _res = this.dataPipe.transform(_value.date, _formatRule.join(' '));
        } else {
            _res = '';
        }
        return _res;
    }
}
