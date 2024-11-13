import { inject, Injectable } from '@angular/core';
import { ThyI18nService } from 'ngx-tethys/i18n';
import { formatDate } from '@angular/common';

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
    protected i18n = inject(ThyI18nService);
    relyOnDatePipe: boolean = this instanceof DateHelperByDatePipe;
    abstract getISOWeek(date: Date): number;
    abstract format(date: Date, formatStr: string): string;
}

export class DateHelperByDatePipe extends DateHelperService {
    getISOWeek(date: Date): number {
        return +this.format(date, 'w');
    }

    format(date: Date | null, formatStr: string): string {
        return date ? formatDate(date, formatStr, this.i18n.getLocaleKey()) : '';
    }

    transCompatFormat(format: string): string {
        return format && format.replace(/Y/g, 'y').replace(/D/g, 'd');
    }
}
