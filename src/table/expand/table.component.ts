import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';

const COLUMN_COUNT = 5;
@Component({
    selector: 'thy-skeleton-table',
    template: `
        <table class="thy-skeleton-table">
            <thead>
                <tr>
                    <th [width]="i === 0 ? '40%' : i === 1 ? '30%' : 'auto'" *ngFor="let key of columnCount; index as i">
                        <thy-skeleton-rectangle
                            [thyRowWidth]="'50px'"
                            [thyRowHeight]="'12px'"
                            [thyBorderRadius]="thyBorderRadius"
                            [thyAnimated]="thyAnimated"
                            [thyAnimatedInterval]="thyAnimatedInterval"
                            [thyPrimaryColor]="thyPrimaryColor"
                            [thySecondaryColor]="thySecondaryColor"
                        ></thy-skeleton-rectangle>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ng-template ngFor let-item [ngForOf]="rowCount" let-i="index + 1">
                    <tr>
                        <td>
                            <div style="display: flex;align-items: center;">
                                <thy-skeleton-rectangle
                                    class="mr-2"
                                    [thyRowWidth]="'18px'"
                                    [thyRowHeight]="thyRowHeight"
                                    [thyBorderRadius]="thyBorderRadius"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-rectangle>
                                <thy-skeleton-rectangle
                                    [thyRowWidth]="i % 3 === 1 ? '70%' : i % 3 === 2 ? '90%' : '60%'"
                                    [thyRowHeight]="thyRowHeight"
                                    [thyBorderRadius]="thyBorderRadius"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-rectangle>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; align-items: center;">
                                <thy-skeleton-circle
                                    class="mr-2"
                                    [thySize]="'28px'"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-circle>

                                <thy-skeleton-rectangle
                                    [thyRowWidth]="i % 3 === 1 ? '70%' : i % 3 === 2 ? '90%' : '60%'"
                                    [thyRowHeight]="thyRowHeight"
                                    [thyBorderRadius]="thyBorderRadius"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-rectangle>
                            </div>
                        </td>
                        <td *ngFor="let item of columnCount.slice(2)">
                            <thy-skeleton-rectangle
                                [thyRowWidth]="'100%'"
                                [thyRowHeight]="thyRowHeight"
                                [thyBorderRadius]="thyBorderRadius"
                                [thyAnimated]="thyAnimated"
                                [thyAnimatedInterval]="thyAnimatedInterval"
                                [thyPrimaryColor]="thyPrimaryColor"
                                [thySecondaryColor]="thySecondaryColor"
                            ></thy-skeleton-rectangle>
                        </td>
                    </tr>
                </ng-template>
            </tbody>
        </table>
    `,
    host: {
        '[class.thy-skeleton-table]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonTableComponent {
    public data: any;
    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 骨架高度
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

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

    rowCount: number[] = [];
    /**
     * 行数
     */
    @Input()
    set thyRowCount(value: number | string) {
        this.rowCount = Array.from({ length: +value });
    }

    columnCount = Array.from({ length: COLUMN_COUNT });
}
