import { Component, Signal } from '@angular/core';
import { ThyI18nLocale, useLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-empty-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyEmptyBasicExampleComponent {
    locale: Signal<ThyI18nLocale> = useLocale();

    text = this.locale().id.includes('zh') ? '空空如也' : 'Empty page';
}
