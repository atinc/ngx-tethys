import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'demo-input-section',
    templateUrl: './input-section.component.html',
    styleUrls: ['./input-section.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoInputSectionComponent {
    model = {
        searchText: '文本1',
        input: '输入内容'
    };

    public apiParameters = [
        {
            property: 'thyAppendText',
            description: '追加文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyAppendTextTranslateKey',
            description: '追加文本多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyPrependText',
            description: '前置文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyPrependTextTranslateKey',
            description: '前置文本多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'append',
            description: '追加的自定义 Template',
            type: 'NgTemplate',
            default: ''
        },
        {
            property: 'prepend',
            description: '前置的自定义 Template',
            type: 'NgTemplate',
            default: ''
        },
        {
            property: 'thySize',
            description: '大小, md, lg',
            type: 'String',
            default: 'md'
        },
        {
            property: 'thyReadonly',
            description: '是否为只读',
            type: 'boolean',
            default: 'false'
        }
    ];

    constructor() {}

    enterInput() {
        console.log(`enter input`);
        this.model.input = '';
    }

    enter() {
        console.log(`enter`);
        this.model.searchText = '';
    }

    searchModelChange() {
        console.log(`searchModelChange:${this.model.searchText}`);
    }
}
