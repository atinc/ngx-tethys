import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { isArray } from 'ngx-tethys/util';

type columnType = 'circle' | 'rectangle';
interface columnInfo {
    type?: columnType;
    width?: string | number;
}
@Component({
    selector: 'thy-skeleton-table',
    template: `
        <thy-table thyRowKey="id" [thyModel]="data" [thyTheme]="thyTheme">
            <thy-table-column thyModelKey="id" *ngFor="let k of columns; index as i">
                <ng-template #cell let-row>
                    <ng-container *ngIf="row['col' + i].type === 'circle'">
                        <thy-skeleton-circle
                            [thySize]="row['col' + i].width"
                            [thyAnimated]="thyAnimated"
                            [thyAnimatedInterval]="thyAnimatedInterval"
                            [thyPrimaryColor]="thyPrimaryColor"
                            [thySecondaryColor]="thySecondaryColor"
                        ></thy-skeleton-circle>
                    </ng-container>
                    <ng-container *ngIf="row['col' + i].type === 'rectangle'">
                        <thy-skeleton-rectangle
                            [thyRowWidth]="row['col' + i].width"
                            [thyRowHeight]="thyRowHeight"
                            [thyBorderRadius]="thyBorderRadius"
                            [thyAnimated]="thyAnimated"
                            [thyAnimatedInterval]="thyAnimatedInterval"
                            [thyPrimaryColor]="thyPrimaryColor"
                            [thySecondaryColor]="thySecondaryColor"
                        ></thy-skeleton-rectangle>
                    </ng-container>
                </ng-template>
            </thy-table-column>
        </thy-table>
    `,
    host: {
        '[class.thy-skeleton-table]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonTableComponent implements OnChanges {
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

    /**
     * 表格主题
     */
    @Input() thyTheme: string = 'default';

    columns: columnInfo[] = [];
    /**
     * 列配置
     * @type number | string | Array<number | string>
     */
    @Input()
    set thyColumns(value: number | string | Array<number | string>) {
        const createColumn = (item: number | string) => {
            const createWidth = (width: string) => parseFloat(width) + 'px';
            const arr = ('' + item).split(':');
            const obj =
                arr.length > 1
                    ? ({
                          type: arr[0] === 'circle' ? 'circle' : 'rectangle',
                          width: createWidth(arr[1])
                      } as columnInfo)
                    : ({
                          type: 'rectangle',
                          width: createWidth(arr[0])
                      } as columnInfo);
            return obj;
        };
        this.columns = isArray(value)
            ? value.map(createColumn)
            : Array.from({ length: +value }).map(
                  () =>
                      ({
                          type: 'rectangle',
                          width: '100%'
                      } as columnInfo)
              );
    }

    rowCount: number[] = [];
    /**
     * 行数
     */
    @Input()
    set thyRowCount(value: number | string) {
        this.rowCount = Array.from({ length: +value });
    }
    get thyRowCount() {
        return this.rowCount.length;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyRowCount, thyColumns } = changes;
        const createTableData = () => {
            this.data = this.rowCount.map(k => {
                return this.columns.reduce((k, v, i) => ((k['col' + i] = v), k), {});
            });
        };
        if (thyRowCount || thyColumns) {
            createTableData();
        }
    }
}
