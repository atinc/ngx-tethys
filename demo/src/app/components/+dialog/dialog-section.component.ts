import { Component, OnDestroy, TemplateRef, Renderer2 } from '@angular/core';
import { ThyDialog, ThyDialogConfig, ThyDialogSizes } from '../../../../../src/dialog';
import { apiParameters } from './api-parameters';
import { mixinUnsubscribe, MixinBase } from '../../../../../src/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoDialogBasicComponent } from './basic/dialog-basic.component';
import { DemoDialogConfirmComponent } from './confirm/confirm.component';
import { DemoDialogInteractiveComponent } from './interactive/interactive.component';

@Component({
    selector: 'demo-dialog-section',
    templateUrl: './dialog-section.component.html'
})
export class DemoDialogSectionComponent extends mixinUnsubscribe(MixinBase) implements OnDestroy {
    public apiParameters = apiParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Dialog Basic',
            component: DemoDialogBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'dialog-basic.component.html',
                    content: require('!!raw-loader!./basic/dialog-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'dialog-basic.component.ts',
                    content: require('!!raw-loader!./basic/dialog-basic.component.ts')
                },
                {
                    type: 'ts',
                    name: 'dialog-content.component.ts',
                    content: require('!!raw-loader!./dialog-content.component.ts')
                }
            ]
        },
        {
            title: 'Confirm',
            description: `使用 thyDialog 服务弹出确认框`,
            component: DemoDialogConfirmComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'confirm.component.html',
                    content: require('!!raw-loader!./confirm/confirm.component.html')
                },
                {
                    type: 'ts',
                    name: 'confirm.component.ts',
                    content: require('!!raw-loader!./confirm/confirm.component.ts')
                }
            ]
        },
        {
            title: 'Dialog Interactive',
            description: `使用 thyDialog 服务弹出模态框和其他组件的兼容示例，比如弹出框中再次弹出自定义 Select 框，和 Tree 的交互`,
            component: DemoDialogInteractiveComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'interactive.component.html',
                    content: require('!!raw-loader!./interactive/interactive.component.html')
                },
                {
                    type: 'ts',
                    name: 'interactive.component.ts',
                    content: require('!!raw-loader!./interactive/interactive.component.ts')
                }
            ]
        }
    ];

    constructor(public thyDialog: ThyDialog, private renderer: Renderer2) {
        super();
    }
}
