import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'paginationTotalPagesFormat'
})
export class PaginationTotalCountFormat implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(count: number, format: string): any {
        if (count && format) {
            return this.sanitizer.bypassSecurityTrustHtml(format.replace(/\{(.+?)\}/g, `<span>${count}</span>`));
        } else {
            return '';
        }
    }
}
