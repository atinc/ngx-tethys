
import { Component } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'demo-checkbox-section',
    templateUrl: './checkbox-section.component.html',
})
export class DemoCheckboxSectionComponent {

    apiParameters = [
        {
            property: 'title',
            description: '标题',
            type: 'String',
            default: ''
        }, {
            property: 'content',
            description: '内容',
            type: 'String',
            default: ''
        }, {
            property: 'buttons',
            description: '按钮',
            type: 'Object',
            default: ''
        }, {
            property: 'buttons.confirm',
            description: '确认按钮',
            type: 'Object',
            default: ''
        }, {
            property: 'buttons.confirm.text',
            description: '确认按钮-显示文本',
            type: 'String',
            default: ''
        }, {
            property: 'buttons.confirm.type',
            description: '确认按钮-样式',
            type: 'ThyButtonType',
            default: ''
        }, {
            property: 'buttons.confirm.loadingText',
            description: '确认按钮-处理中显示文本',
            type: 'String',
            default: ''
        }, {
            property: 'buttons.confirm.action',
            description: '确认按钮-处理事件',
            type: 'Function',
            default: ''
        },
    ];

    model = {
        checked1: true,
        checked2: false,
        checkboxInline: false
    };

    constructor(
    ) { }

}
