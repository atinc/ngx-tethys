import { Component, ViewEncapsulation, TemplateRef } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoFormBasicComponent } from './basic/form-basic.component';
import { DemoFormModalComponent } from './modal/form-modal.component';

@Component({
    selector: 'demo-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: ['./form-section.scss'],
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None
})
export class DemoFormSectionComponent {
    public apiThyFormParameters = [
        {
            property: 'thyForm',
            description: '表示这个 Form 由 Thy 控制',
            type: 'Directive',
            default: ''
        },
        {
            property: 'thyLayout',
            description: `布局, 'horizontal' | 'vertical' | 'inline' , 默认水平居中 horizontal， 其他2种布局待开发`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyEnterKeyMode',
            description: `Enter 键提交模式， submit | alwaysSubmit | forbidSubmit， 默认 submit,
            submit: Textare 需要 Ctrl | Command + Enter 提交，其他元素直接 Enter 提交； alwaysSubmit: 不管是什么元素 Enter 都提交； forbidSubmit: Enter 不提交`,
            type: 'String',
            default: 'submit'
        }
    ];

    public apiThyFormSubmitParameters = [
        {
            property: 'thyFormSubmit',
            description: 'Form 验证通过的提交函数',
            type: 'Function',
            default: ''
        }
    ];

    public apiFormGroupParameters = [
        {
            property: 'thyLabelText',
            description: 'Label 文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLabelTextTranslateKey',
            description: 'Label 文本多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLabelRequired',
            description: 'Label 是否显示必填项样式',
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyFeedbackIcon',
            description: '反馈图标，比如日期输入框显示日期的图标，常用输入 date 表示时间 wtf wtf-schedule-o',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTips',
            description: '提示文案',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTipsTranslateKey',
            description: '提示文案的多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyRowFill',
            description: '是否填充整行, 没有 Label 文本，只有输入框',
            type: 'Boolean',
            default: ''
        },
        {
            property: 'formGroup',
            description: '自定义内容的 Template',
            type: 'NgTemplate',
            default: ''
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoFormBasicComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'form-basic.component.html',
                    content: require('!!raw-loader!./basic/form-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'form-basic.component.ts',
                    content: require('!!raw-loader!./basic/form-basic.component.ts')
                }
            ]
        },
        {
            title: 'Modal Form',
            description: ``,
            component: DemoFormModalComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-pair.component.html',
                    content: require('!!raw-loader!./modal/form-modal.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-pair.component.ts',
                    content: require('!!raw-loader!./modal/form-modal.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}
