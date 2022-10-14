import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Optional, Inject, OnInit } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { SkeletonDefaultConfig, THY_SKELETON_CONFIG, ThySkeletonConfigModel } from '../skeleton.config';
@Component({
    selector: 'thy-skeleton-bullet-list',
    template: `
        <ng-container *ngFor="let item of rowsCount; index as i">
            <div class="d-flex" [ngClass]="i !== rowsCount.length - 1 && 'vertical-gutter'">
                <thy-skeleton-circle
                    [thyAnimated]="thyAnimated"
                    [thyAnimatedInterval]="thyAnimatedInterval"
                    [thySize]="thySize"
                    [thyPrimaryColor]="thyPrimaryColor"
                    [thySecondaryColor]="thySecondaryColor"
                >
                </thy-skeleton-circle>
                <div class="horizontal-gutter"></div>
                <div style="flex: 1">
                    <thy-skeleton-rectangle
                        [thyRowWidth]="thyRowWidth"
                        [thyRowHeight]="thyRowHeight"
                        [thyAnimated]="thyAnimated"
                        [thyPrimaryColor]="thyPrimaryColor"
                        [thySecondaryColor]="thySecondaryColor"
                        [thyBorderRadius]="thyBorderRadius"
                        [thyAnimatedInterval]="thyAnimatedInterval"
                    ></thy-skeleton-rectangle>
                </div>
            </div>
        </ng-container>
    `,
    host: {
        '[class.thy-skeleton-bullet-list-wrap]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonBulletListComponent implements OnInit {
    /**
     * 骨架宽度
     * @default 100%
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     * @default 20px
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * 骨架边框圆角
     * @default 4px
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 是否开启动画
     * @default true
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    /**
     * 动画速度
     * @default 1.5s
     */
    @Input() thyAnimatedInterval: string | number;

    /**
     * 骨架主色
     * @default #f7f7f7
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     * @default #eeeeee
     */
    @Input() thySecondaryColor: string;

    /**
     * circle类型骨架尺寸
     */
    @Input()
    @InputCssPixel()
    thySize: string | number;

    rowsCount: number[] = [1];
    /**
     * 行数
     */
    @Input()
    set thyRowsCount(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
    get thyRowsCount() {
        return this.rowsCount.length;
    }

    constructor(
        @Optional()
        @Inject(THY_SKELETON_CONFIG)
        private skeletonConfigModel: ThySkeletonConfigModel
    ) {}

    ngOnInit() {
        const config = { ...SkeletonDefaultConfig?.thyBulletListConfig, ...this.skeletonConfigModel?.thyBulletListConfig };
        const { thySize, thyRowWidth, thyRowHeight, thyBorderRadius, thyRowsCount } = config;

        for (let key in { thySize, thyRowWidth, thyRowHeight, thyBorderRadius, thyRowsCount }) {
            this[key] = this[key] || config[key];
        }
    }
}
