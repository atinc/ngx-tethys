import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DemoFlexibleTextBasicComponent } from './basic/flexible-text-basic.component';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';

@Component({
    selector: 'demo-flexible-text',
    templateUrl: './flexible-text-section.component.html',
    styleUrls: ['./flexible-text-section.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoFlexibleTextComponent implements OnInit {
    public apiThyFlexibleTextParameters = [
        {
            property: 'thyTooltipContent',
            description: '需要展示的全部内容',
            type: 'String | TemplateRef',
            default: 'String'
        },
        {
            property: 'thyTooltipPlacement',
            description: 'tooltip 的提示位置，top | bottom | left | right',
            type: 'String',
            default: 'top'
        },
        {
            property: 'thyTooltipTrigger',
            description: '触发提示方式，hover, focus, click',
            type: 'string',
            default: 'hover'
        },
        {
            property: 'thyContainContainerClass',
            description: '是否包含容器类，设置为false避免对原有元素的布局产生影响',
            type: 'boolean',
            default: true
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoFlexibleTextBasicComponent,
            description: `两种使用方式：组件方式、指令方式。`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'flexible-text-basic.component.html',
                    content: require('!!raw-loader!./basic/flexible-text-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'flexible-text-basic.component.ts',
                    content: require('!!raw-loader!./basic/flexible-text-basic.component.ts')
                }
            ]
        }
    ];

    constructor() {}

    ngOnInit() {}
}
