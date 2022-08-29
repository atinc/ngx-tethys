import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-skeleton',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        class: 'el-skeleton'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonComponent {
    /**
     * 段落首行长度
     */
    @Input() thyFirstWidth: string;

    /**
     * 段落尾行长度
     */
    @Input() thyLastWidth: string;

    /**
     * 内容长度
     */
    @Input() thyWidth: string;

    /**
     * 内容长度
     */
    @Input() thyCustomTemplate: TemplateRef<HTMLElement>;

    /**
     * circle类型大小
     */
    @Input() thySize: string;

    /**
     * 是否开启动画
     */
    @Input() thyAnimated: boolean;

    /**
     * 动画速度
     */
    @Input() thyAnimatedSpeed: string;

    /**
     * 主色调
     */
    @Input() thyPrimaryColor: string;

    /**
     * 次色调
     */
    @Input() thySecondaryColor: string;

    /**
     * rectangle类型圆角尺寸
     */
    @Input() thyBorderRadius: string;

    /**
     * 高度
     */
    @Input() thyHeight: string;
}
