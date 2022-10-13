import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
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
    @Input()
    @InputCssPixel()
    thyFirstWidth: string | number;

    /**
     * 段落尾行长度
     */
    @Input()
    @InputCssPixel()
    thyLastWidth: string | number;

    /**
     * 是否开启动画
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    /**
     * 动画速度
     */
    @Input() thyAnimatedInterval: string | number;

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
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * rectangle类型长度
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * rectangle类型高度
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * circle类型骨架尺寸
     */
    @Input()
    @InputCssPixel()
    thySize: string | number;
}
