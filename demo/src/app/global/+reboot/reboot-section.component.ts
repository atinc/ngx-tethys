import { Component, OnInit } from '@angular/core';
import { DemoRebootFontSizeComponent } from './font-size/font-size.component';
import { DemoRebootTextComponent } from './text/text.component';
import { DemoRebootBgComponent } from './bg/bg.component';
import { DemoRebootIconTextComponent } from './icon-text/icon-text.component';
import { DemoRebootEditableComponent } from './editable/editable.component';
import { DemoRebootUtilitiesComponent } from './utilities/utilities.component';

@Component({
    selector: 'app-demo-reboot-section',
    templateUrl: `./reboot-section.component.html`
})
export class DemoRebootSectionComponent implements OnInit {
    liveDemos = [
        {
            title: '字体大小',
            description: ``,
            component: DemoRebootFontSizeComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'font-size.component.html',
                    content: require('!!raw-loader!./font-size/font-size.component.html')
                },
                {
                    type: 'ts',
                    name: 'font-size.component.ts',
                    content: require('!!raw-loader!./font-size/font-size.component.ts')
                }
            ]
        },
        {
            title: '文本',
            description: ``,
            component: DemoRebootTextComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'text.component.html',
                    content: require('!!raw-loader!./text/text.component.html')
                },
                {
                    type: 'ts',
                    name: 'text.component.ts',
                    content: require('!!raw-loader!./text/text.component.ts')
                }
            ]
        },
        {
            title: '背景色',
            description: ``,
            component: DemoRebootBgComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'bg.component.html',
                    content: require('!!raw-loader!./bg/bg.component.html')
                },
                {
                    type: 'ts',
                    name: 'text.component.ts',
                    content: require('!!raw-loader!./bg/bg.component.ts')
                }
            ]
        },
        {
            title: '图标文字',
            description: ``,
            component: DemoRebootIconTextComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'icon-text.component.html',
                    content: require('!!raw-loader!./icon-text/icon-text.component.html')
                },
                {
                    type: 'ts',
                    name: 'icon-text.component.ts',
                    content: require('!!raw-loader!./icon-text/icon-text.component.ts')
                }
            ]
        },
        {
            title: '可编辑文本',
            description: ``,
            component: DemoRebootEditableComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'editable.component.html',
                    content: require('!!raw-loader!./editable/editable.component.html')
                },
                {
                    type: 'ts',
                    name: 'editable.component.ts',
                    content: require('!!raw-loader!./editable/editable.component.ts')
                }
            ]
        },
        {
            title: '工具样式',
            description: ``,
            component: DemoRebootUtilitiesComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'utilities.component.html',
                    content: require('!!raw-loader!./utilities/utilities.component.html')
                },
                {
                    type: 'ts',
                    name: 'utilities.component.ts',
                    content: require('!!raw-loader!./utilities/utilities.component.ts')
                }
            ]
        }
    ];

    constructor() {}

    ngOnInit(): void {}
}
