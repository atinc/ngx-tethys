import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ThyI18nLocale } from 'ngx-tethys/i18n';

/**
 * @private
 */
@Pipe({
    name: 'paginationTotalPagesFormat'
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
    name: 'paginationPerPageFormat'
})
export class PaginationPerPageFormat implements PipeTransform {
    transform(unit: string, locale: ThyI18nLocale): string {
        if (locale.id.includes('en') || locale.id.includes('de')) {
            // eg. 5 / page
            // eg. 5 / Seite
            return ` / ${locale.pagination.page}`;
        } else {
            // eg. 5 条/页
            // eg. 5 個/頁
            // eg. 5 条/ページ
            return ` ${unit}/${locale.pagination.page}`;
        }
    }
}
