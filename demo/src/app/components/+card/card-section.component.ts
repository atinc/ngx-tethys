
import { Component } from '@angular/core';

@Component({
    selector: 'demo-card-section',
    templateUrl: './card-section.component.html',
})
export class DemoCardSectionComponent {

    title = '我的项目';

    apiParameters = [
        {
            property: 'thyTitle',
            description: '头部，标题',
            type: '',
            default: ''
        },
        {
            property: 'thyTitleInfo',
            description: '头部，附加信息',
            type: '',
            default: ''
        },
        {
            property: 'thySize',
            description: '头部',
            type: '',
            default: ''
        },
        {
            property: 'thyHasLeftRightPadding',
            description: '内容区，是否有左右内边距',
            type: '',
            default: ''
        },
        {
            property: 'thyScroll',
            description: '内容区，滚动',
            type: '',
            default: ''
        },
        {
            property: 'thyAlignment',
            description: '内容区，对齐头部文字',
            type: '',
            default: ''
        },
    ];

    constructor() {
    }

}
