import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty, coerceCssPixelValue, helpers, isUndefinedOrNull, ThyBooleanInput } from 'ngx-tethys/util';
import { ThySkeleton } from './skeleton.component';
import { THY_SKELETON_CONFIG } from './skeleton.config';

/**
 * 骨架屏矩形组件
 * @name thy-skeleton-rectangle
 * @order 20
 */
@Component({
    selector: 'thy-skeleton-rectangle',
    host: {
        '[class.thy-skeleton]': 'true',
        '[class.thy-skeleton-rectangle]': 'true',
        '[style.background]': 'primaryColor()',
        '[style.width]': 'thyRowWidth()',
        '[style.height]': 'thyRowHeight()',
        '[style.borderRadius]': 'thyBorderRadius()'
    },
    template: ` <div class="thy-skeleton-after" [ngStyle]="afterStyles()"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgStyle]
})
export class ThySkeletonRectangle {
    private skeletonConfigModel = inject(THY_SKELETON_CONFIG, { optional: true });

    private parent = inject(ThySkeleton, { optional: true })!;

    /**
     * 是否展示动画
     * @default true
     */
    readonly thyAnimated = input<boolean, ThyBooleanInput>(undefined, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     * @default 1.5s
     */
    readonly thyAnimatedInterval = input<string | number>();

    /**
     * 骨架边框圆角
     * @default 4px
     */
    readonly thyBorderRadius = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架宽度
     * @default 100%
     */
    readonly thyRowWidth = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架高度
     * @default 20px
     */
    readonly thyRowHeight = input<string, string | number>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架主色
     * @default #F7F7F7
     */
    readonly thyPrimaryColor = input<string>();

    /**
     * 骨架次色
     * @default #aaaaaa
     */
    readonly thySecondaryColor = input<string>();

    readonly animatedInterval = computed(() => {
        return this.thyAnimatedInterval() || this.parent?.thyAnimatedInterval() || this.skeletonConfigModel.thyAnimatedInterval;
    });

    readonly primaryColor = computed(() => {
        return this.thyPrimaryColor() || this.parent?.thyPrimaryColor() || this.skeletonConfigModel.thyPrimaryColor;
    });

    readonly secondaryColor = computed(() => {
        return this.thySecondaryColor() || this.parent?.thySecondaryColor() || this.skeletonConfigModel.thySecondaryColor;
    });

    readonly animated = computed(() => {
        if (!isUndefinedOrNull(this.thyAnimated())) {
            return this.thyAnimated();
        }
        if (!isUndefinedOrNull(this.parent?.thyAnimated())) {
            return this.parent.thyAnimated();
        }
        return this.skeletonConfigModel.thyAnimated;
    });

    readonly afterStyles = computed(() => {
        return {
            ...(this.secondaryColor() && {
                background: `linear-gradient(90deg, ${helpers.hexToRgb(this.secondaryColor(), 0)}, ${helpers.hexToRgb(
                    this.secondaryColor(),
                    0.15
                )}, ${helpers.hexToRgb(this.secondaryColor(), 0)}`
            }),
            animation: ![false, 'false'].includes(this.animated()) ? `thy-skeleton-animation ${this.animatedInterval()}s infinite` : 'none'
        };
    });
}
