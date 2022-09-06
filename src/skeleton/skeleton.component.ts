import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'thy-skeleton',
    template: `
        <ng-content></ng-content>
    `,
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
     * 是否开启动画
     */
    @Input() thyAnimated: boolean;

    /**
     * 动画速度
     */
    @Input() thyAnimatedSpeed: string;

    /**
     * 骨架主色调
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色调
     */
    @Input() thySecondaryColor: string;

    /**
     * rectangle类型圆角尺寸
     */
    @Input() thyBorderRadius: string;

    /**
     * rectangle类型长度
     */
    @Input() thyWidth: string;

    /**
     * rectangle类型高度
     */
    @Input() thyHeight: string;

    /**
     * circle类型骨架尺寸
     */
    @Input() thySize: string;
}
