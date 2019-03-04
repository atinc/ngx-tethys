import { Injectable } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale, jaLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { daterangepickerUtilIdentificationValueType, daterangepickerUtilConvertToDaterangepickerObject } from './util';
registerLocaleData(localeZhHans, 'zh-Hans');

@Injectable()
export class ThyDatepickerService {
    dataPipe = new DatePipe('zh-Hans');

    locale = 'zh-cn';

    locales = listLocales();

    localeRef: any;

    storeType: 'date' | 'range';

    store: {
        originValue?: any;
        originValueType?: any;
        originWithTime?: boolean;
        value?: any;
        withTime?: boolean;
    } = {};

    constructor(public localeService: BsLocaleService) {}

    initLocale(value?: string) {
        if (value) {
            this.locale = value;
            this.localeRef = null;
        }
        if (this.localeRef) {
            return;
        }
        switch (this.locale) {
            case 'zh-cn':
            case 'zh-tw':
                zhCnLocale.week.dow = 0;
                this.localeRef = defineLocale('zh-cn', zhCnLocale);
                break;
            case 'ja-jp':
                this.localeRef = defineLocale('ja-jp', jaLocale);
                break;
            case 'en-us':
                this.localeRef = defineLocale('en-us', enGbLocale);
                break;
        }
        this.localeService.use(this.locale);
    }

    initValueData(value: any, isRefreshType?: boolean) {
        this.store.originValue = value;
        if (this.storeType === 'range') {
            this.store.originValueType = daterangepickerUtilIdentificationValueType(value);
            this.store.originWithTime = value && value.begin && value.begin.with_time;
        }
        if (this.storeType === 'range') {
            this.store.value = daterangepickerUtilConvertToDaterangepickerObject(value);
        }
    }
}
