import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, inject, input, computed } from '@angular/core';
import { ThySkeleton } from './skeleton.component';
import { coerceBooleanProperty, helpers } from 'ngx-tethys/util';
import { THY_SKELETON_CONFIG } from './skeleton.config';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { NgStyle } from '@angular/common';
import { coerceCssPixelValue } from '@angular/cdk/coercion';

/**
 * 骨架屏圆形组件
 * @name thy-skeleton-circle
 * @order 30
 */
@Component({
    selector: 'thy-skeleton-circle',
    host: {
        '[class.thy-skeleton]': 'true',
        '[class.thy-skeleton-circle]': 'true',
        '[style.background]': 'primaryColor()',
        '[style.width]': 'thySize()',
        '[style.height]': 'thySize()'
    },
    template: ` <div class="thy-skeleton-after" [ngStyle]="afterStyles()"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [NgStyle]
})
export class ThySkeletonCircle {
    private skeletonConfigModel = inject(THY_SKELETON_CONFIG, { optional: true })!;

    private parent = inject(ThySkeleton, { optional: true })!;

    /**
     * 动画速度
     * @default 1.5s
     */
    readonly thyAnimatedInterval = input<string | number>();

    /**
     * 骨架尺寸
     * @default 20px
     */
    readonly thySize = input<string, string | number>(`20px`, { transform: coerceCssPixelValue });

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

    /**
     * 是否展示动画
     * @default true
     */
    readonly thyAnimated = input< boolean, string | boolean>(undefined, { transform: coerceBooleanProperty });

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
