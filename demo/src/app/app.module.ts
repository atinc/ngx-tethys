import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgxTethysModule, THY_NOTIFY_DEFAULT_OPTIONS, THY_SLIDE_DEFAULT_CONFIG } from 'ngx-tethys';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';

import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS, DEMO_MODULES } from './components';
import { appRoutes } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyTranslate } from '../../../src/shared';
import { DemoThyTranslate, thyValidatorConfigProvider } from './config';
import { FormsModule } from '@angular/forms';
import { ThyAvatarService } from '../../../src/public-api';
import { CustomAvatarService } from './components/+avatar/custom-avatar.service';

import { ThyStoreModule } from '../../../src/store/module';
import { DriveStore } from './store/drive-store';
import { TasksStore } from './store/tasks-store';
import { DESIGN_COMPONENTS } from './design';
import { ThyMarkdownParserService } from '../../../src/markdown';
import { CustomMarkdownParserService } from './components/+markdown/custom-markdown.service';
import { GLOBAL_MODULES } from './global';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { SharedModule } from './shared.module';
import { DemoTreeSelectModule } from './components/+tree-select/module';
import { thyFormConfigProvider } from './config/form.config';
import { THY_DIALOG_LAYOUT_CONFIG } from '../../../src/dialog/dialog.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, ...COMPONENTS, ...DESIGN_COMPONENTS, SidebarComponent],
    entryComponents: [...ENTRY_COMPONENTS],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        DemoTreeSelectModule,
        ...DEMO_MODULES,
        ...GLOBAL_MODULES,
        RouterModule.forRoot(appRoutes, {
            useHash: false
        }),
        ModalModule.forRoot(),
        DragDropModule,
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        TranslateModule,
        SortablejsModule.forRoot({}),
        ThyStoreModule.forFeature([TasksStore, DriveStore]),
        TextFieldModule,
        OverlayModule
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
            useClass: CustomMarkdownParserService
        },
        thyValidatorConfigProvider,
        thyFormConfigProvider,
        {
            provide: THY_SLIDE_DEFAULT_CONFIG,
            useValue: {
                drawerContainer: '.thy-layout-content'
            }
        },
        {
            provide: THY_DIALOG_LAYOUT_CONFIG,
            useValue: {
                footerAlign: 'left',
                footerDivided: false
            }
        },
        {
            provide: THY_NOTIFY_DEFAULT_OPTIONS,
            useValue: {
                placement: 'topRight'
            }
        }
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
