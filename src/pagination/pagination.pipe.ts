import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
