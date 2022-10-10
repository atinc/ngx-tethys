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
        '[style.background]': 'thyPrimaryColor',
        '[style.width]': 'thyWidth',
        '[style.height]': 'thyHeight',
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
     */
    @Input() thyAnimatedInterval: number;

    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 骨架宽度
     */
    @Input()
    @InputCssPixel()
    thyWidth: string | number;

    /**
     * 骨架高度
     */
    @Input()
    @InputCssPixel()
    thyHeight: string | number;

    /**
     * 骨架主色
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     */
    @Input() thySecondaryColor: string;

    afterStyles: Style = {};

    constructor(@Optional() private _parent: ThySkeletonComponent) {}

    ngOnInit() {
        if (this._parent) {
            const {
                thyAnimatedInterval,
                thyHeight,
                thyPrimaryColor,
                thyBorderRadius,
                thySecondaryColor,
                thyAnimated,
                thyWidth
            } = this._parent;

            for (let key in {
                thyAnimatedInterval,
                thyHeight,
                thyBorderRadius,
                thyPrimaryColor,
                thySecondaryColor,
                thyAnimated,
                thyWidth
            }) {
                this[key] = this[key] || this._parent[key];
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const thySecondaryColorChange = () => {
            this.afterStyles.background = `linear-gradient(90deg, ${helpers.hexToRgb(this.thySecondaryColor, 0)}, ${helpers.hexToRgb(
                this.thySecondaryColor,
                0.4
            )}, ${helpers.hexToRgb(this.thySecondaryColor, 0)}`;
        };
        const thyAnimatedChange = () => {
            this.afterStyles.animation =
                this.thyAnimated !== false ? `thy-skeleton-animation ${this.thyAnimatedInterval}s infinite` : 'none';
        };

        const { thySecondaryColor, thyAnimated, thyAnimatedInterval } = changes;

        thySecondaryColor?.currentValue && thySecondaryColorChange();
        (thyAnimated || thyAnimatedInterval) && thyAnimatedChange();
    }
}
