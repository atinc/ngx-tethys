import { Component } from '@angular/core';

@Component({
    selector: 'thy-comment-nest-example',
    templateUrl: './nest.component.html',
    standalone: false
})
export class ThyCommentNestExampleComponent {
    constructor() {}

    public data = {
        author: '怀特洛克',
        avatar: 'assets/images/one-avatar.jpg',
        date: '2022-10-18 17:01:06',
        content:
            '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒' +
            '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒, 提升客户使用过程整体感觉很棒',
        children: [
            {
                author: '朔伊尔',
                avatar: 'assets/images/one-avatar.jpg',
                date: '2022-10-18 17:01:06',
                content:
                    '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒' +
                    '现有产品的各个功能、用户体验的持续优化，提升客户使',
                children: [
                    {
                        author: '卡雷拉斯',
                        avatar: 'assets/images/one-avatar.jpg',
                        date: '2022-10-18 17:03:06',
                        content:
                            '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒'
                    },
                    {
                        author: '布里奇特',
                        avatar: 'assets/images/one-avatar.jpg',
                        date: '2022-10-18 17:03:06',
                        content:
                            '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒' +
                            '现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体现有产品的各个功能、用户体验的持续优化，提升客户使用过程整体感觉很棒, 提升客户使用过程整体感觉很棒'
                    }
                ]
            }
        ]
    };
}
