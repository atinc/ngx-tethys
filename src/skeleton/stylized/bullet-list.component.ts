import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputCssPixel } from 'ngx-tethys/core';


import { ThySkeletonCircle } from '../skeleton-circle.component';
import { ThySkeletonRectangle } from '../skeleton-rectangle.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 骨架屏无序列表组件
 * @name thy-skeleton-bullet-list
 * @order 50
 */
@Component({
    selector: 'thy-skeleton-bullet-list',
    template: `
        @for (item of rowCount; track item; let i = $index) {
          <div class="d-flex vertical-gap">
            <thy-skeleton-circle
              [thyAnimated]="thyAnimated"
              [thyAnimatedInterval]="thyAnimatedInterval"
              [thySize]="thySize"
              [thyPrimaryColor]="thyPrimaryColor"
              [thySecondaryColor]="thySecondaryColor">
            </thy-skeleton-circle>
            <div class="horizontal-gap"></div>
            <div style="flex: 1">
              <thy-skeleton-rectangle
                [thyRowWidth]="thyRowWidth"
                [thyRowHeight]="thyRowHeight"
                [thyAnimated]="thyAnimated"
                [thyPrimaryColor]="thyPrimaryColor"
                [thySecondaryColor]="thySecondaryColor"
                [thyBorderRadius]="thyBorderRadius"
              [thyAnimatedInterval]="thyAnimatedInterval"></thy-skeleton-rectangle>
            </div>
          </div>
        }
        `,
    host: {
        '[class.thy-skeleton-bullet-list]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ThySkeletonCircle, ThySkeletonRectangle]
})
export class ThySkeletonBulletList {
    /**
     * 骨架宽度
     * @default 100%
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     * @default 20px
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * 骨架边框圆角
     * @default 4px
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 是否开启动画
     * @default true
     */
    @Input({ transform: coerceBooleanProperty })
    thyAnimated: boolean;

    /**
     * 动画速度
     * @default 1.5s
     */
    @Input() thyAnimatedInterval: string | number;

    /**
     * 骨架主色
     * @default #f7f7f7
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     * @default #aaaaaa
     */
    @Input() thySecondaryColor: string;

    /**
     * circle类型骨架尺寸
     */
    @Input()
    @InputCssPixel()
    thySize: string | number;

    rowCount: number[] = [];
    /**
     * 行数
     */
    @Input()
    set thyRowCount(value: number | string) {
        this.rowCount = Array.from({ length: +value });
    }
    get thyRowCount() {
        return this.rowCount.length;
    }

    constructor() {}
}
