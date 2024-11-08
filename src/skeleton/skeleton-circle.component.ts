import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ThySkeleton } from './skeleton.component';
import { coerceBooleanProperty, helpers } from 'ngx-tethys/util';
import { InputCssPixel } from 'ngx-tethys/core';
import { THY_SKELETON_CONFIG, ThySkeletonConfigModel } from './skeleton.config';
import { isUndefinedOrNull } from 'ngx-tethys/util';
import { NgStyle } from '@angular/common';

interface Style {
    background?: string;
    animation?: string;
}

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
        '[style.background]': 'thyPrimaryColor',
        '[style.width]': 'thySize',
        '[style.height]': 'thySize'
    },
    template: ` <div class="thy-skeleton-after" [ngStyle]="afterStyles"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgStyle]
})
export class ThySkeletonCircle implements OnInit, OnChanges {
    private skeletonConfigModel = inject(THY_SKELETON_CONFIG, { optional: true })!;
    private _parent = inject(ThySkeleton, { optional: true })!;

    /**
     * 动画速度
     * @default 1.5s
     */
    @Input() thyAnimatedInterval: string | number;

    /**
     * 骨架尺寸
     * @default 20px
     */
    @Input()
    @InputCssPixel()
    thySize: string | number = 20;

    /**
     * 骨架主色
     * @default #F7F7F7
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     * @default #aaaaaa
     */
    @Input() thySecondaryColor: string;

    /**
     * 是否展示动画
     * @default true
     */
    @Input({ transform: coerceBooleanProperty })
    thyAnimated: boolean;

    public afterStyles: Style = {};

    ngOnInit() {
        const config = {
            ...this.skeletonConfigModel,
            ...(this._parent || {}),
            ...(!isUndefinedOrNull(this._parent?.thyAnimated) && { thyAnimated: this._parent.thyAnimated }) // do it because @InputBoolean() lead to cannot get thyAnimated from _parent inject
        };
        const { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated } = config;
        for (let key in { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated }) {
            this[key] = !isUndefinedOrNull(this[key]) ? this[key] : config[key];
        }
        this.crateAfterStyles();
    }

    crateAfterStyles() {
        this.afterStyles = {
            ...(this.thySecondaryColor && {
                background: `linear-gradient(90deg, ${helpers.hexToRgb(this.thySecondaryColor, 0)}, ${helpers.hexToRgb(
                    this.thySecondaryColor,
                    0.15
                )}, ${helpers.hexToRgb(this.thySecondaryColor, 0)}`
            }),
            animation: ![false, 'false'].includes(this.thyAnimated)
                ? `thy-skeleton-animation ${this.thyAnimatedInterval}s infinite`
                : 'none'
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thySecondaryColor, thyAnimated, thyAnimatedInterval } = changes;
        if (
            (thySecondaryColor && !thySecondaryColor?.firstChange) ||
            (thyAnimated && !thyAnimated?.firstChange) ||
            (thyAnimatedInterval && !thyAnimatedInterval?.firstChange)
        ) {
            this.crateAfterStyles();
        }
    }
}
