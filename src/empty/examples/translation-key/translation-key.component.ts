import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'thy-empty-translation-key-example',
    templateUrl: './translation-key.component.html',
    styles: [
        `
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
export class ThyEmptyTranslationKeyExampleComponent {
    private translate = inject(TranslateService);

    translationValues = { translate: '示例' };
    constructor() {
        const translate = this.translate;

        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            example: {
                TRANSLATION: '暂无{{translate}}',
                MESSAGE: '暂无消息'
            }
        });
    }
}
