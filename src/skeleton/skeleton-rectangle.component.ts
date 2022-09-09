import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, Optional } from '@angular/core';
import { ThySkeletonComponent } from './skeleton.component';
import { helpers } from 'ngx-tethys/util';

@Component({
    selector: 'thy-skeleton-rectangle',
    host: {
        '[class]': 'getWrapClass()',
        '[style]': 'getWrapStyle()'
    },
    template: `
        <div class="thy-skeleton-after" [ngStyle]="getAfterStyle()"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonRectangleComponent implements OnInit {
    /**
     * 是否开启动画
     */
    @Input() thyAnimated: boolean = true;

    /**
     * 动画速度
     */
    @Input() thyAnimatedSpeed: number;

    /**
     * 骨架边框圆角
     */
    @Input() thyBorderRadius: string;

    /**
     * 骨架宽度
     */
    @Input() thyWidth: string;

    /**
     * 骨架高度
     */
    @Input() thyHeight: string;

    /**
     * 骨架主色
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     */
    @Input() thySecondaryColor: string;

    constructor(@Optional() private _parent: ThySkeletonComponent) {}

    getWrapClass() {
        return {
            'thy-skeleton': true
        };
    }

    getWrapStyle() {
        return {
            background: `${this.thyPrimaryColor}`,
            width: this.thyWidth,
            height: this.thyHeight,
            borderRadius: this.thyBorderRadius
        };
    }

    getAfterStyle() {
        return {
            background: `linear-gradient(90deg, ${helpers.hexToRgba(this.thySecondaryColor, 0)}, ${helpers.hexToRgba(
                this.thySecondaryColor,
                0.4
            )}, ${helpers.hexToRgba(this.thySecondaryColor, 0)}`,
            animation: this.thyAnimated !== false ? `thy-skeleton-animation ${this.thyAnimatedSpeed}s infinite` : 'none'
        };
    }

    ngOnInit() {
        if (this._parent) {
            const {
                thyAnimatedSpeed,
                thyHeight,
                thyPrimaryColor,
                thyBorderRadius,
                thySecondaryColor,
                thyAnimated,
                thyWidth
            } = this._parent;

            for (let key in { thyAnimatedSpeed, thyHeight, thyBorderRadius, thyPrimaryColor, thySecondaryColor, thyAnimated, thyWidth }) {
                this[key] = this[key] || this._parent[key];
            }
        }
    }
}
