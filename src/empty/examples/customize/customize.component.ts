import { Component, Signal } from '@angular/core';
import { ThyI18nLocale, useLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'thy-empty-customize-example',
    templateUrl: './customize.component.html',
    styles: [
        `
            .empty-button {
                margin-top: 18px;
            }
            .demo-empty {
                background-color: var(--gray-10);
                margin-bottom: 15px;
                padding: 20px 0;
            }
            .demo-empty-last {
                margin-bottom: 0;
            }
        `
    ]
})
export class ThyEmptyCustomizeExampleComponent {
    locale: Signal<ThyI18nLocale> = useLocale();
    isZhCn = this.locale().id.includes('zh');

    backToHome = this.isZhCn ? '返回主页' : 'Back to Home';

    description = this.isZhCn ? '确实还没有数据啦' : 'There is indeed no data yet';

    constructor() {}

    goHome() {}
}
