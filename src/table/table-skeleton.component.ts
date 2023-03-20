import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { ThySkeletonCircleComponent, ThySkeletonRectangleComponent } from 'ngx-tethys/skeleton';

const COLUMN_COUNT = 5;

/**
 * 表格的骨架屏组件
 * @name thy-table-skeleton
 */
@Component({
    selector: 'thy-table-skeleton',
    templateUrl: './table-skeleton.component.html',
    host: {
        class: 'thy-table-skeleton'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgFor, ThySkeletonRectangleComponent, ThySkeletonCircleComponent]
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
    thyRowHeight: string | number = '18px';

    /**
     * 是否开启动画
     * @default false
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
