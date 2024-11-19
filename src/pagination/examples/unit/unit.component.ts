import { Component, computed, Signal } from '@angular/core';
import { ThyI18nLocale, useLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-pagination-unit-example',
    templateUrl: './unit.component.html'
})
export class ThyPaginationUnitExampleComponent {
    locale: Signal<ThyI18nLocale> = useLocale();

    customUnit: Signal<string> = computed(() => (this.locale().id.includes('zh') ? '组' : 'group'));
}
