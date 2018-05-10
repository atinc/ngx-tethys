import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DatepickerValueEntry } from './i.datepicker';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans, 'zh-Hans');

@Pipe({ name: 'thyDatepicker' })
export class ThyDatepickerPipe implements PipeTransform {

    dataPipe = new DatePipe('zh-Hans');

    transform(value: DatepickerValueEntry, exponent: string): string {
        let _res;
        if (value && value.date) {
            const _formatRule = ['yyyy-MM-dd'];
            if (value.with_time) {
                _formatRule.push('HH:mm');
            }
            _res = this.dataPipe.transform(value.date, _formatRule.join(' '));
        } else {
            _res = ' ';
        }
        return _res;
    }
}
