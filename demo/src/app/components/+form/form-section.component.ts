
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-form-section',
    templateUrl: './form-section.component.html',
    styleUrls: [
        './form-section.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DemoFormSectionComponent {

    submitSuccess = false;

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
        }
    ];

    public apiThyFormSubmitParameters = [
        {
            property: 'thyFormSubmit',
            description: 'Form 验证通过的提交函数',
            type: 'Function',
            default: ''
        },
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
            property: 'formGroup',
            description: '自定义内容的 Template',
            type: 'NgTemplate',
            default: ''
        }
    ];

    model: any = {
        select: 1
    };

    options = [
        {
            _id: 1,
            value: '选项1'
        },
        {
            _id: 2,
            value: '选项2'
        }
    ];

    constructor() {
    }

    save(form: any) {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }
}
