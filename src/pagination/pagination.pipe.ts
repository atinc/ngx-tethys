import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ThyI18nLocale } from 'ngx-tethys/i18n';

/**
 * @private
 */
@Pipe({
    name: 'paginationTotalPagesFormat',
    standalone: true
})
export class PaginationTotalCountFormat implements PipeTransform {
    private sanitizer = inject(DomSanitizer);

    transform(count: number, format: string): any {
        if (count && format) {
            return this.sanitizer.bypassSecurityTrustHtml(format.replace(/\{(.+?)\}/g, `<span>${count}</span>`));
        } else {
            return '';
        }
    }
}

@Pipe({
    name: 'paginationPerPageFormat',
    standalone: true
})
export class PaginationPerPageFormat implements PipeTransform {
    transform(unit: string, locale: ThyI18nLocale): any {
        if (locale.id.includes('zh')) {
            // 5 条/页
            return ' ' + unit + '/' + locale.pagination.page;
        } else {
            // 5 / page
            return ' / ' + locale.pagination.page;
        }
    }
}
