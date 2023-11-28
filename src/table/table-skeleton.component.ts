import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { ThySkeletonCircle, ThySkeletonRectangle } from 'ngx-tethys/skeleton';
import { ThyTableSkeletonColumn } from './table.interface';
import { ThyViewOutletDirective } from 'ngx-tethys/shared';
import { ThyTableColumnSkeletonType } from './enums';
import { ThyTableSize, ThyTableTheme } from './table.component';

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
    imports: [NgFor, NgClass, NgIf, NgTemplateOutlet, ThyViewOutletDirective, ThySkeletonRectangle, ThySkeletonCircle]
})
export class ThyTableSkeleton {
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
    thyRowHeight: string | number = '20px';

    /**
     * 是否开启动画
     * @default true
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean = true;

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

    /**
     * 是否展示骨架头
     * @default false
     */
    @Input() @InputBoolean() thyHeadless = false;

    /**
     * 骨架屏的风格
     * @type default | bordered | boxed
     */
    @Input() thyTheme: ThyTableTheme = 'default';

    /**
     * 骨架屏的大小
     * @type xs | sm | md | lg | xlg | default
     * @default md
     */
    @Input() thySize: ThyTableSize = 'md';

    /**
     * 设置表格最小宽度
     */
    @Input()
    @InputCssPixel()
    thyMinWidth: string | number;

    /**
     * 表格列骨架的配置项，支持配置列宽、骨架类型
     * @type ThyTableSkeletonColumn[]
     */
    @Input() set thyColumns(columns: ThyTableSkeletonColumn[]) {
        if (columns && columns.length) {
            this.columns = columns;
        } else {
            this.columns = [...this.defaultColumns];
        }
    }

    public titleHeight = '16px';

    public titleWidth = '50px';

    public checkBoxWidth = '20px';

    public avatarSize = '24px';

    public columnType = ThyTableColumnSkeletonType;

    get tableClassMap() {
        return {
            table: true,
            'table-bordered': this.thyTheme === 'bordered',
            'table-boxed': this.thyTheme === 'boxed',
            [`table-${this.thySize}`]: !!this.thySize
        };
    }

    private defaultColumns = Array.from({ length: COLUMN_COUNT }).map((item, index: number) => {
        if (index === 0) {
            return {
                width: '40%',
                type: ThyTableColumnSkeletonType.title
            };
        } else if (index === 1) {
            return {
                width: '17%',
                type: ThyTableColumnSkeletonType.member
            };
        } else {
            return {
                width: 'auto',
                type: ThyTableColumnSkeletonType.default
            };
        }
    });

    public columns: ThyTableSkeletonColumn[] = [...this.defaultColumns];

    public trackByFn(index: number) {
        return index;
    }
}
