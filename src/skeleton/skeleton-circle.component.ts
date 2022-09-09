import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, Optional } from '@angular/core';
import { ThySkeletonComponent } from './skeleton.component';
import { helpers } from 'ngx-tethys/util';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-circle',
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
export class ThySkeletonCircleComponent implements OnInit {
    /**
     * 动画速度
     */
    @Input() thyAnimatedSpeed: string | number;

    /**
     * 骨架尺寸
     */
    @Input() thySize: string;

    /**
     * 骨架主色
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     */
    @Input() thySecondaryColor: string;

    /**
     * 是否展示动画
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    constructor(@Optional() private _parent: ThySkeletonComponent) {}

    getWrapClass() {
        return {
            'thy-skeleton': true,
            'thy-skeleton-circle': true
        };
    }
    getWrapStyle() {
        return {
            background: `${this.thyPrimaryColor}`,
            width: this.thySize,
            height: this.thySize
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
            const { thyAnimatedSpeed, thySize, thyPrimaryColor, thySecondaryColor, thyAnimated } = this._parent;

            for (let key in { thyAnimatedSpeed, thySize, thyPrimaryColor, thySecondaryColor, thyAnimated }) {
                this[key] = this[key] || this._parent[key];
            }
        }
    }
}
