import { Injectable } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale, jaLocale, enGbLocale } from 'ngx-bootstrap/locale';

@Injectable()
export class ThyDatepickerService {

    locale = 'zh-cn';

    locales = listLocales();

    localeRef: any;

    constructor(
        public localeService: BsLocaleService
    ) {
    }

    public initLocale(value?: string) {
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
}
