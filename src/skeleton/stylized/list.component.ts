import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Optional, Inject, OnInit } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { SkeletonDefaultConfig, THY_SKELETON_CONFIG, ThySkeletonConfigModel } from '../skeleton.config';
@Component({
    selector: 'thy-skeleton-list',
    template: `
        <ng-container *ngFor="let k of rowsCount; index as i">
            <thy-skeleton-rectangle
                [ngClass]="i !== rowsCount.length - 1 && 'vertical-gutter'"
                [thyRowWidth]="thyRowWidth"
                [thyRowHeight]="thyRowHeight"
                [thyAnimated]="thyAnimated"
                [thyPrimaryColor]="thyPrimaryColor"
                [thySecondaryColor]="thySecondaryColor"
                [thyBorderRadius]="thyBorderRadius"
                [thyAnimatedInterval]="thyAnimatedInterval"
            ></thy-skeleton-rectangle>
        </ng-container>
    `,
    host: {
        '[class.thy-skeleton-list-wrap]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonListComponent implements OnInit {
    /**
     * 骨架宽度
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 是否开启动画
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    /**
     * 动画速度
     */
    @Input() thyAnimatedInterval: string;
    /**
     * 骨架主色
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     */
    @Input() thySecondaryColor: string;

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
        const config = { ...SkeletonDefaultConfig?.thyListConfig, ...this.skeletonConfigModel?.thyListConfig };
        const { thyRowWidth, thyRowHeight, thyBorderRadius, thyRowsCount } = config;

        for (let key in { thyRowWidth, thyRowHeight, thyBorderRadius, thyRowsCount }) {
            this[key] = this[key] || config[key];
        }
    }
}
