import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-list',
    template: `
        <div *ngFor="let item of sectionCount" [ngClass]="thySectionClass || 'mb-4'">
            <ng-container *ngFor="let k of rowsCount; index as i">
                <thy-skeleton-rectangle
                    [ngClass]="thyItemClass || 'mb-2'"
                    [thyWidth]="thyWidth"
                    [thyHeight]="thyHeight"
                    [thyAnimated]="thyAnimated"
                    [thyPrimaryColor]="thyPrimaryColor"
                    [thySecondaryColor]="thySecondaryColor"
                    [thyBorderRadius]="thyBorderRadius"
                    [thyAnimatedInterval]="thyAnimatedInterval"
                ></thy-skeleton-rectangle>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonListComponent {
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

    /**
     * 骨架分段样式
     */
    @Input() thySectionClass: string = null;

    /**
     * 骨架段落样式
     */
    @Input() thyItemClass: string = null;

    sectionCount: number[] = [1];
    /**
     * 段落数
     */
    @Input()
    set thySections(value: number | string) {
        this.sectionCount = Array.from({ length: +value });
    }

    rowsCount: number[] = [1];
    /**
     * 行数
     */
    @Input()
    set thyRows(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
}
