import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty, coerceCssPixelValue, ThyBooleanInput } from 'ngx-tethys/util';
import { ThySkeletonRectangle } from '../skeleton-rectangle.component';

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
    readonly thyFirstWidth = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 尾行宽度
     */
    readonly thyLastWidth = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

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
    readonly thyAnimated = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

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
