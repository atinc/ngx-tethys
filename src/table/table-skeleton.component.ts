import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';

const COLUMN_COUNT = 5;
@Component({
    selector: 'thy-table-skeleton',
    template: `
        <table class="thy-table-skeleton">
            <thead>
                <tr>
                    <th [width]="i === 0 ? '40%' : i === 1 ? '20%' : 'auto'" *ngFor="let key of columnCount; index as i">
                        <thy-skeleton-rectangle
                            [thyRowWidth]="titleWidth"
                            [thyRowHeight]="titleHeight"
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
                            <div class="d-flex" style="align-items:center">
                                <thy-skeleton-rectangle
                                    class="mr-2"
                                    [thyRowWidth]="checkBoxWidth"
                                    [thyRowHeight]="thyRowHeight"
                                    [thyBorderRadius]="thyBorderRadius"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-rectangle>
                                <thy-skeleton-rectangle
                                    [thyRowWidth]="i % 3 === 1 ? '70%' : i % 3 === 2 ? '85%' : '60%'"
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
                            <div class="d-flex" style="align-items:center">
                                <thy-skeleton-circle
                                    class="mr-2"
                                    [thySize]="avatarSize"
                                    [thyAnimated]="thyAnimated"
                                    [thyAnimatedInterval]="thyAnimatedInterval"
                                    [thyPrimaryColor]="thyPrimaryColor"
                                    [thySecondaryColor]="thySecondaryColor"
                                ></thy-skeleton-circle>

                                <thy-skeleton-rectangle
                                    [thyRowWidth]="i % 3 === 1 ? '50%' : i % 3 === 2 ? '60%' : '40%'"
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
                                [thyRowWidth]="'70%'"
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThyTableSkeletonComponent {
    /**
     * 骨架边框圆角
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 表格内容骨架高度
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

    public titleHeight = '12px';

    public titleWidth = '50px';

    public checkBoxWidth = '18px';

    public avatarSize = '28px';

    columnCount = Array.from({ length: COLUMN_COUNT });
}
