import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxTethysModule } from '../../../src/public-api';
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
import { DemoThyTranslate, thyValidatorConfigProvider } from './config';
import { FormsModule } from '@angular/forms';
import { ThyAvatarService } from '../../../src/public-api';
import { CustomAvatarService } from './components/+avatar/custom-avatar.service';
import { CustomEditorService } from './components/+editor/custom-editor.service';
import { ThyMarkdownParserService } from '../../../src/directive';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { ThyStoreModule } from '../../../src/store/module';
import { DriveStore } from './store/drive-store';
import { TasksStore } from './store/tasks-store';
import { DESIGN_COMPONENTS } from './design';
export function hljsLanguages() {
    return [{ name: 'typescript', func: typescript }, { name: 'scss', func: scss }, { name: 'xml', func: xml }];
}

@NgModule({
    declarations: [AppComponent, ...COMPONENTS, ...DOCS_COMPONENTS, ...DESIGN_COMPONENTS],
    entryComponents: [...ENTRY_COMPONENTS],
    imports: [
        BrowserModule,
        FormsModule,
        NgxTethysModule,
        RouterModule.forRoot(appRoutes, {
            useHash: true
        }),
        ModalModule.forRoot(),
        DragDropModule,
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        TranslateModule,
        SortablejsModule.forRoot({}),
        HighlightModule.forRoot({
            languages: hljsLanguages
        }),
        ThyStoreModule.forFeature([TasksStore, DriveStore]),
        TextFieldModule
    ],
    providers: [
        {
            provide: ThyTranslate,
            useClass: DemoThyTranslate
        },
        {
            provide: ThyAvatarService,
            useClass: CustomAvatarService
        },
        {
            provide: ThyMarkdownParserService,
            useClass: CustomEditorService
        },
        thyValidatorConfigProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private translate: TranslateService) {
        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            common: {
                OK: '确定',
                CANCEL: '取消',
                DELETING: '删除中...',
                DELETE_CONFIRM: '确认删除',
                tips: {
                    NO_RESULT: '没有数据',
                    NO_RESULT_TARGET: '没有{{target}}'
                },
                confirm: {
                    CONTENT_DEFAULT: '确认删除这个吗？',
                    CONTENT: '确认删除项目 <code>{{name}}</code> 吗？'
                }
            },
            mission: {
                PROJECT: '项目',
                TASK: '任务'
            }
        });
    }
}
