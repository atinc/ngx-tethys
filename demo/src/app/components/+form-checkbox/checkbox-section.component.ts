import { Component } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

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
            description: '设定全部 checkbox disable 状态 Set All checkbox disable status',
            type: 'Boolean',
            default: 'false'
        }
    ];

    model = {
        checked1: true,
        checked2: false,
        checked3: false,
        checkboxInline: false,
        disabled: false
    };

    constructor() {}

    change() {
        console.log(`model change as ${this.model.checked1}`);
    }
}
