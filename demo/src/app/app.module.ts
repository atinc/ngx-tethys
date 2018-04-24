import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from '../../../src/index';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { DOCS_COMPONENTS } from './docs/index';
import { appRoutes } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyTranslate } from '../../../src/shared';
import { DemoThyTranslate } from './demo-thy-translate';

@NgModule({
    declarations: [
        AppComponent,
        ...COMPONENTS,
        ...DOCS_COMPONENTS
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    imports: [
        BrowserModule,
        NgxTethysModule,
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        TranslateModule,
        SortablejsModule.forRoot({})
    ],
    providers: [
        {
            provide: ThyTranslate,
            useClass: DemoThyTranslate
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private translate: TranslateService) {
        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            common: {
                tips: {
                    'NO_RESULT': '没有数据',
                    'NO_RESULT_TARGET': '没有{{target}}'
                }
            },
            mission: {
                'TASK': '任务'
            }
        });
    }
}
