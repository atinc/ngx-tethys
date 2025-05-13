import { ChangeDetectionStrategy, Component, input, ViewEncapsulation, computed } from '@angular/core';
import { ThySkeletonRectangle } from '../skeleton-rectangle.component';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { coerceCssPixelValue } from '@angular/cdk/coercion';

/**
 * 骨架屏段落组件
 * @name thy-skeleton-paragraph
 * @order 60
 */
@Component({
    selector: 'thy-skeleton-paragraph',
    template: `
        @for (k of rows(); track $index; let i = $index) {
            <thy-skeleton-rectangle
                class="vertical-gap"
                [thyRowWidth]="i === 0 ? thyFirstWidth() : i === rows().length - 1 ? thyLastWidth() : thyRowWidth()"
                [thyRowHeight]="thyRowHeight()"
                [thyAnimated]="thyAnimated()"
                [thyPrimaryColor]="thyPrimaryColor()"
                [thySecondaryColor]="thySecondaryColor()"
                [thyBorderRadius]="thyBorderRadius()"
                [thyAnimatedInterval]="thyAnimatedInterval()"></thy-skeleton-rectangle>
        }
    `,
    host: { '[class.thy-skeleton-paragraph]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ThySkeletonRectangle]
})
export class ThySkeletonParagraph {
    /**
     * 首行宽度
     */
    thyFirstWidth = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 尾行宽度
     */
    thyLastWidth = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架宽度
     */
    thyRowWidth = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架高度
     */
    thyRowHeight = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架边框圆角
     */
    thyBorderRadius = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 是否开启动画
     * @default false
     */
    thyAnimated = input<string | boolean, boolean>(undefined, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     */
    thyAnimatedInterval = input<string | number>();

    /**
     * 骨架主色
     */
    thyPrimaryColor = input<string>();

    /**
     * 骨架次色
     */
    thySecondaryColor = input<string>();

    /**
     * 行数
     */
    thyRowCount = input<number | string>();

    rows = computed(() => {
        return Array.from({ length: +this.thyRowCount() });
    });
}
