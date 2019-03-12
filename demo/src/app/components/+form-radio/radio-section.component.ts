
import { Component } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'demo-radio-section',
    templateUrl: './radio-section.component.html',
})
export class DemoRadioSectionComponent {

    apiParameters = [
        {
            property: 'thyInline',
            description: '同一行展示',
            type: 'Boolean',
            default: 'false'
        }, {
            property: 'thyLabelText',
            description: 'Checkbox Label 文本',
            type: 'String',
            default: ''
        }, {
            property: 'thyLabelTextTranslateKey',
            description: 'Checkbox Label 文本 多语言 key',
            type: 'String',
            default: ''
        }, {
            property: 'thyDisabled',
            description: '禁用',
            type: 'Boolean',
            default: 'false'
        }, {
            property: 'ngModel',
            description: '表单双向绑定的值',
            type: 'Boolean',
            default: ''
        }, {
            property: 'disabled',
            description: '是否禁用，当和 ngModel 配置使用才会有效，如果单独设置禁用使用  thyDisabled',
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyValue',
            description: '当和 thy-radio-group 配合使用时的值，选中后的 NgModel 值',
            type: 'String',
            default: ''
        }
    ];

    apiGroupParameters = [
        {
            property: 'ngModel',
            description: '双向绑定值，指定选中的 Radio 的 thyValue 的值',
            type: 'String',
            default: ''
        }, {
            property: 'ngModelChange',
            description: '值发生改变回调函数',
            type: 'String',
            default: ''
        }, {
            property: 'thyDisabled',
            description: '禁用',
            type: 'Boolean',
            default: 'false'
        }, {
            property: 'disabled',
            description: '是否禁用，当和 ngModel 配置使用才会有效，如果单独设置禁用使用  thyDisabled',
            type: 'Boolean',
            default: ''
        }
    ];



    model = {
        checked1: true,
        checked2: false,
        checked3: false,
        checkboxInline: false,
        disabled: false,
        groupDisabled: false
    };

    modelGroup = '1';

    constructor(
    ) { }

    change() {
        console.log(`model change as ${this.model.checked1}`);
    }
}
