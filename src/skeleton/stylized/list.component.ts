import { ChangeDetectionStrategy, Component, input, ViewEncapsulation, computed } from '@angular/core';
import { ThySkeletonRectangle } from '../skeleton-rectangle.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { coerceCssPixelValue } from '@angular/cdk/coercion';

/**
 * 骨架屏列表组件
 * @name thy-skeleton-list
 * @order 40
 */
@Component({
    selector: 'thy-skeleton-list',
    template: `
        @for (k of rows(); track $index; let i = $index) {
            <thy-skeleton-rectangle
                class="vertical-gap"
                [thyRowWidth]="thyRowWidth()"
                [thyRowHeight]="thyRowHeight()"
                [thyAnimated]="thyAnimated()"
                [thyPrimaryColor]="thyPrimaryColor()"
                [thySecondaryColor]="thySecondaryColor()"
                [thyBorderRadius]="thyBorderRadius()"
                [thyAnimatedInterval]="thyAnimatedInterval()"></thy-skeleton-rectangle>
        }
    `,
    host: { '[class.thy-skeleton-list]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ThySkeletonRectangle]
})
export class ThySkeletonList {
    /**
     * 骨架宽度
     */
    readonly thyRowWidth = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架高度
     */
    readonly thyRowHeight = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架边框圆角
     */
    readonly thyBorderRadius = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 是否开启动画
     * @default false
     */
    readonly thyAnimated = input<boolean, string | boolean>(undefined, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     */
    readonly thyAnimatedInterval = input<string | number>();

    /**
     * 骨架主色
     */
    readonly thyPrimaryColor = input<string>();

    /**
     * 骨架次色
     */
    readonly thySecondaryColor = input<string>();

    /**
     * 行数
     */
    readonly thyRowCount = input<number | string>();

    readonly rows = computed(() => {
        return Array.from({ length: +this.thyRowCount() });
    });
}
