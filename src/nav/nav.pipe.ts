import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'bypassSecurityTrustHtml'
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(format: string): any {
        if (format) {
            return this.sanitizer.bypassSecurityTrustHtml(format);
        } else {
            return '';
        }
    }
}
