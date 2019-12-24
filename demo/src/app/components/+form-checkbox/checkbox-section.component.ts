import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoCheckboxBasicComponent } from './basic/basic.component';
import { DemoCheckboxIndeterminateComponent } from './indeterminate/indeterminate.component';

@Component({
    selector: 'demo-checkbox-section',
    templateUrl: './checkbox-section.component.html'
})
export class DemoCheckboxSectionComponent {
    apiParameters = [
        {
            property: 'thyInline',
            description: '同一行展示',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyLabelText',
            description: 'Checkbox Label 文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLabelTextTranslateKey',
            description: 'Checkbox Label 文本 多语言 key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '禁用',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'ngModel',
            description: '表单双向绑定的值',
            type: 'Boolean',
            default: ''
        },
        {
            property: 'disabled',
            description: '是否禁用，当和 ngModel 配置使用才会有效，如果单独设置禁用使用  thyDisabled',
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyIndeterminate',
            description:
                '设置 indeterminate 状态，只负责样式控制 Set the indeterminate state, responsible only for style control',
            type: 'Boolean',
            default: 'false'
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoCheckboxBasicComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'basic.component.html',
                    content: require('!!raw-loader!./basic/basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./basic/basic.component.ts')
                }
            ]
        },
        {
            title: 'Indeterminate Checkbox',
            component: DemoCheckboxIndeterminateComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'indeterminate.component.html',
                    content: require('!!raw-loader!./indeterminate/indeterminate.component.html')
                },
                {
                    type: 'ts',
                    name: 'indeterminate.component.ts',
                    content: require('!!raw-loader!./indeterminate/indeterminate.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}
