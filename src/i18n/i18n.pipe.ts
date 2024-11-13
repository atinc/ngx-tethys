import { inject, Pipe, PipeTransform } from '@angular/core';
import { ThyI18nService } from './i18n.service';

@Pipe({
    name: 'translate',
    standalone: true
})
export class ThyI18nTranslate implements PipeTransform {
    i18n = inject(ThyI18nService);

    transform(path: string, variablesMap?: object): string {
        return this.i18n.translate(path, variablesMap);
    }
}
