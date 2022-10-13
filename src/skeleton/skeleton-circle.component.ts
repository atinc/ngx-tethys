import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { ThySkeletonComponent } from './skeleton.component';
import { helpers } from 'ngx-tethys/util';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
interface Style {
    background?: string;
    animation?: string;
}
@Component({
    selector: 'thy-skeleton-circle',
    host: {
        '[class.thy-skeleton]': 'true',
        '[class.thy-skeleton-circle]': 'true',
        '[style.background]': 'thyPrimaryColor',
        '[style.width]': 'thySize',
        '[style.height]': 'thySize'
    },
    template: `
        <div class="thy-skeleton-after" [ngStyle]="afterStyles"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonCircleComponent implements OnInit, OnChanges {
    /**
     * 动画速度
     * @default 1.2s
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
     * @default #eeeeee
     */
    @Input() thySecondaryColor: string;

    /**
     * 是否展示动画
     * @default true
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    afterStyles: Style = {};

    constructor(@Optional() private _parent: ThySkeletonComponent) {}

    ngOnInit() {
        if (this._parent) {
            const { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated } = this._parent;

            for (let key in { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated }) {
                this[key] = this[key] || this._parent[key];
            }
        }
    }

    createStyle() {
        this.afterStyles = {
            ...(this.thySecondaryColor && {
                background: `linear-gradient(90deg, ${helpers.hexToRgb(this.thySecondaryColor, 0)}, ${helpers.hexToRgb(
                    this.thySecondaryColor,
                    0.4
                )}, ${helpers.hexToRgb(this.thySecondaryColor, 0)}`
            }),
            animation: this.thyAnimated !== false ? `thy-skeleton-animation ${this.thyAnimatedInterval}s infinite` : 'none'
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thySecondaryColor, thyAnimated, thyAnimatedInterval } = changes;
        if (thySecondaryColor?.currentValue || thyAnimated || thyAnimatedInterval) {
            this.createStyle();
        }
    }
}
