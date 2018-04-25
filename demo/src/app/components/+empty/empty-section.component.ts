
import { Component } from '@angular/core';

@Component({
    selector: 'demo-empty-section',
    templateUrl: './empty-section.component.html',
    styleUrls: [
        './empty-section.scss'
    ]
})
export class DemoEmptySectionComponent {

    public apiParameters = [
        {
            property: 'thyMessage',
            description: '显示文本提示信息',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTranslationKey',
            description: '显示文本提示信息多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTranslationValues',
            description: '显示文本提示信息多语言 Key 的 Values',
            type: 'Object',
            default: ''
        },
        {
            property: 'thyEntityName',
            description: '显示默认提示信息，替换默认提示信息的目标对象，比如：没有 {thyEntityName}',
            type: 'String',
            default: ''
        },
        {
            property: 'thyEntityNameTranslateKey',
            description: 'thyEntityName 的多语言 Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyIconClass',
            description: '提示图标',
            type: 'String',
            default: 'wtf-empty-o'
        },
        {
            property: 'thySize',
            description: '大小, md, lg',
            type: 'String',
            default: 'md'
        },
        {
            property: 'thyMarginTop',
            description: 'margin-top',
            type: 'number',
            default: ''
        },
        {
            property: 'thyTopAuto',
            description: '自动根据父容器计算高度，水平居中',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyContainer',
            description: '自动计算高度传入父容器',
            type: 'elementRef',
            default: ''
        }
    ];

    constructor() {
    }

}
