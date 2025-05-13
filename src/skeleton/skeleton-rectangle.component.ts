import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject, input, computed } from '@angular/core';
import { ThySkeleton } from './skeleton.component';
import { coerceBooleanProperty, helpers } from 'ngx-tethys/util';
import { THY_SKELETON_CONFIG } from './skeleton.config';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { NgStyle } from '@angular/common';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
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
    thyAnimated = input<string | boolean, boolean>(true, { transform: coerceBooleanProperty });

    /**
     * 动画速度
     * @default 1.5s
     */
    thyAnimatedInterval = input<string | number>();

    /**
     * 骨架边框圆角
     * @default 4px
     */
    thyBorderRadius = input<string | number, string>(4, { transform: coerceCssPixelValue });

    /**
     * 骨架宽度
     * @default 100%
     */
    thyRowWidth = input<string | number, string>(100, { transform: coerceCssPixelValue });

    /**
     * 骨架高度
     * @default 20px
     */
    thyRowHeight = input<string | number, string>(undefined, { transform: coerceCssPixelValue });

    /**
     * 骨架主色
     * @default #F7F7F7
     */
    thyPrimaryColor = input<string>();

    /**
     * 骨架次色
     * @default #aaaaaa
     */
    thySecondaryColor = input<string>();

    animatedInterval = computed(() => {
        return this.thyAnimatedInterval() || this.parent?.thyAnimatedInterval() || this.skeletonConfigModel.thyAnimatedInterval;
    });

    primaryColor = computed(() => {
        return this.thyPrimaryColor() || this.parent?.thyPrimaryColor() || this.skeletonConfigModel.thyPrimaryColor;
    });

    secondaryColor = computed(() => {
        return this.thySecondaryColor() || this.parent?.thySecondaryColor() || this.skeletonConfigModel.thySecondaryColor;
    });

    animated = computed(() => {
        if (!isUndefinedOrNull(this.thyAnimated())) {
            return this.thyAnimated();
        }
        if (!isUndefinedOrNull(this.parent?.thyAnimated())) {
            return this.parent.thyAnimated();
        }
        return this.skeletonConfigModel.thyAnimated;
    });

    afterStyles = computed(() => {
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
