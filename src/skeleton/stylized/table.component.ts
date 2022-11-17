import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { InputBoolean, InputCssPixel } from 'ngx-tethys/core';
import { isArray } from 'ngx-tethys/util';

const RANDOM_MIN = 0.7;
const RANDOM_MAX = 1;
@Component({
    selector: 'thy-skeleton-table',
    template: `
        <thy-table thyRowKey="id" [thyModel]="data">
            <thy-table-column thyModelKey="id" *ngFor="let k of cols; index as i">
                <ng-template #cell let-row>
                    <thy-skeleton-rectangle
                        [thyRowWidth]="row['col' + i]"
                        [thyRowHeight]="thyRowHeight"
                        [thyBorderRadius]="thyBorderRadius"
                        [thyAnimated]="thyAnimated"
                        [thyAnimatedInterval]="thyAnimatedInterval"
                        [thyPrimaryColor]="thyPrimaryColor"
                        [thySecondaryColor]="thySecondaryColor"
                    ></thy-skeleton-rectangle>
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

    cols: Array<number | string> = [];
    /**
     * 列配置
     * @type number | string | Array<number | string>
     */
    @Input()
    set thyCols(value: number | string | Array<number | string>) {
        this.cols = isArray(value) ? value.map(k => parseFloat(k + '')) : Array.from({ length: +value });
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
        const { thyRowCount, thyCols } = changes;
        const createTableData = () => {
            this.data = this.rowCount.map(k => {
                return this.cols.reduce(
                    (k, v, i) => (
                        (k['col' + i] = v ? Math.round((Math.random() * (RANDOM_MAX - RANDOM_MIN) + RANDOM_MIN) * +v) + 'px' : '100%'), k
                    ),
                    {}
                );
            });
        };
        if (thyRowCount || thyCols) {
            createTableData();
        }
    }
}
