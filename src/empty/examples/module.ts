import { ThyButtonModule, ThyEmptyModule, ThyTranslate } from 'ngx-tethys';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThyEmptyBasicExampleComponent } from './basic/basic.component';
import { ThyEmptyEntityNameExampleComponent } from './entity-name/entity-name.component';
import { ThyEmptyExtraExampleComponent } from './extra/extra.component';
import { ThyEmptyIconExampleComponent } from './icon/icon.component';
import { ThyEmptyImgExampleComponent } from './img/img.component';
import { ThyEmptyMessageExampleComponent } from './message/message.component';
import { ThyEmptySizeExampleComponent } from './size/size.component';
import { ThyEmptyTopExampleComponent } from './top/top.component';

const COMPONENTS = [
    ThyEmptyBasicExampleComponent,
    ThyEmptySizeExampleComponent,
    ThyEmptyTopExampleComponent,
    ThyEmptyMessageExampleComponent,
    ThyEmptyEntityNameExampleComponent,
    ThyEmptyIconExampleComponent,
    ThyEmptyImgExampleComponent,
    ThyEmptyExtraExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyEmptyModule, TranslateModule.forRoot(), TranslateModule, ThyButtonModule],
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
    constructor(private translate: TranslateService) {
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
