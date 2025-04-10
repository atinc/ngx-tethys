import { formatDate } from '@angular/common';
import { Injectable, Signal } from '@angular/core';
import { ThyI18nLocale, injectLocale } from 'ngx-tethys/i18n';

export function DATE_HELPER_SERVICE_FACTORY(): DateHelperService {
    return new DateHelperByDatePipe();
}

/**
 * @private
 */
@Injectable({
    providedIn: 'root',
    useFactory: DATE_HELPER_SERVICE_FACTORY
})
export abstract class DateHelperService {
    locale: Signal<ThyI18nLocale> = injectLocale();
    relyOnDatePipe: boolean = this instanceof DateHelperByDatePipe;
    abstract getISOWeek(date: Date): number;
    abstract format(date: Date, formatStr: string, tz?: string): string;
}

export class DateHelperByDatePipe extends DateHelperService {
    getISOWeek(date: Date): number {
        return +this.format(date, 'w');
    }

    format(date: Date | null, formatStr: string, tz?: string): string {
        return date ? formatDate(date, formatStr, this.locale().id, tz) : '';
    }

    transCompatFormat(format: string): string {
        return format && format.replace(/Y/g, 'y').replace(/D/g, 'd');
    }
}
