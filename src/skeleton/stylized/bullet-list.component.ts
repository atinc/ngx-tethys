import { ChangeDetectionStrategy, Component, input, ViewEncapsulation, computed } from '@angular/core';
import { ThySkeletonCircle } from '../skeleton-circle.component';
import { ThySkeletonRectangle } from '../skeleton-rectangle.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { coerceCssPixelValue } from '@angular/cdk/coercion';

/**
 * 骨架屏无序列表组件
 * @name thy-skeleton-bullet-list
 * @order 50
 */
@Component({
    selector: 'thy-skeleton-bullet-list',
    template: `
        @for (item of rows(); track $index; let i = $index) {
            <div class="d-flex vertical-gap">
                <thy-skeleton-circle
                    [thyAnimated]="thyAnimated()"
                    [thyAnimatedInterval]="thyAnimatedInterval()"
                    [thySize]="thySize()"
                    [thyPrimaryColor]="thyPrimaryColor()"
                    [thySecondaryColor]="thySecondaryColor()">
                </thy-skeleton-circle>
                <div class="horizontal-gap"></div>
                <div style="flex: 1">
                    <thy-skeleton-rectangle
                        [thyRowWidth]="thyRowWidth()"
                        [thyRowHeight]="thyRowHeight()"
                        [thyAnimated]="thyAnimated()"
                        [thyPrimaryColor]="thyPrimaryColor()"
                        [thySecondaryColor]="thySecondaryColor()"
                        [thyBorderRadius]="thyBorderRadius()"
                        [thyAnimatedInterval]="thyAnimatedInterval()"></thy-skeleton-rectangle>
                </div>
            </div>
        }
    `,
    host: { '[class.thy-skeleton-bullet-list]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ThySkeletonCircle, ThySkeletonRectangle]
})
export class ThySkeletonBulletList {
    /**
     * 骨架宽度
     * @default 100%
     */
    thyRowWidth = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架高度
     * @default 20px
     */
    thyRowHeight = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架边框圆角
     * @default 4px
     */
    thyBorderRadius = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 是否开启动画
     * @default true
     */
    thyAnimated = input<string | boolean, boolean>(undefined, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     * @default 1.5s
     */
    thyAnimatedInterval = input<string | number>();

    /**
     * 骨架主色
     * @default #f7f7f7
     */
    thyPrimaryColor = input<string>();

    /**
     * 骨架次色
     * @default #aaaaaa
     */
    thySecondaryColor = input<string>();

    /**
     * circle类型骨架尺寸
     */
    thySize = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 行数
     */
    thyRowCount = input<number | string>();

    rows = computed(() => {
        return Array.from({ length: +this.thyRowCount() });
    });

    constructor() {}
}
