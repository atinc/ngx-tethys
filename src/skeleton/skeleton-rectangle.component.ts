import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { ThySkeletonComponent } from './skeleton.component';
import { helpers } from 'ngx-tethys/util';
import { InputCssPixel, InputBoolean } from 'ngx-tethys/core';
interface Style {
    background?: string;
    animation?: string;
}
@Component({
    selector: 'thy-skeleton-rectangle',
    host: {
        '[class.thy-skeleton]': 'true',
        '[class.thy-skeleton-rectangle]': 'true',
        '[style.background]': 'thyPrimaryColor',
        '[style.width]': 'thyRowWidth',
        '[style.height]': 'thyRowHeight',
        '[style.borderRadius]': 'thyBorderRadius'
    },
    template: `
        <div class="thy-skeleton-after" [ngStyle]="afterStyles"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonRectangleComponent implements OnInit, OnChanges {
    /**
     * 是否开启动画
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean = true;

    /**
     * 动画速度
     * @default 1.2s
     */
    @Input() thyAnimatedInterval: number;

    /**
     * 骨架边框圆角
     * @default 6px
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 骨架宽度
     * @default 100%
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     * @default 1rem
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

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
