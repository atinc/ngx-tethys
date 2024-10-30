import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyGridModule } from 'ngx-tethys/grid';
import { Observable } from 'rxjs/internal/Observable';

import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThyEmptyBasicExampleComponent } from './basic/basic.component';
import { ThyEmptyContainerExampleComponent } from './container/container.component';
import { ThyEmptyCustomizeExampleComponent } from './customize/customize.component';
import { ThyEmptyEntityNameExampleComponent } from './entity-name/entity-name.component';
import { ThyEmptyIconExampleComponent } from './icon/icon.component';
import { ThyEmptyImgExampleComponent } from './img/img.component';
import { ThyEmptyMarginTopExampleComponent } from './margin-top/margin-top.component';
import { ThyEmptyMessageExampleComponent } from './message/message.component';
import { ThyEmptySizeExampleComponent } from './size/size.component';
import { ThyEmptyTopExampleComponent } from './top/top.component';
import { ThyEmptyTranslationKeyExampleComponent } from './translation-key/translation-key.component';

const COMPONENTS = [
    ThyEmptyBasicExampleComponent,
    ThyEmptySizeExampleComponent,
    ThyEmptyTopExampleComponent,
    ThyEmptyMessageExampleComponent,
    ThyEmptyEntityNameExampleComponent,
    ThyEmptyIconExampleComponent,
    ThyEmptyImgExampleComponent,
    ThyEmptyCustomizeExampleComponent,
    ThyEmptyContainerExampleComponent,
    ThyEmptyMarginTopExampleComponent,
    ThyEmptyTranslationKeyExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, TranslateModule.forRoot(), TranslateModule, ThyEmptyModule, ThyButtonModule, ThyGridModule],
    exports: [...COMPONENTS],
    providers: [
        {
            provide: ThyTranslate,
            useFactory: (translate: TranslateService) => {
                return {
                    instant(key: string | Array<string>, interpolateParams?: Object): string | any {
                        return translate.instant(key, interpolateParams);
                    },
                    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
                        return translate.get(key, interpolateParams);
                    }
                };
            },
            deps: [TranslateService]
        }
    ]
})
export class ThyEmptyExamplesModule {
    private translate = inject(TranslateService);

    constructor() {
        const translate = this.translate;

        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            common: {
                tips: {
                    NO_RESULT: '没有数据',
                    NO_RESULT_TARGET: '没有{{target}}'
                }
            },
            mission: {
                PROJECT: '项目',
                TASK: '任务'
            }
        });
    }
}
