import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @private
 */
@Pipe({
    name: 'bypassSecurityTrustHtml',
    standalone: true
})
export class BypassSecurityTrustHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(format: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(format);
    }
}
