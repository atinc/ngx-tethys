import { useHostRenderer } from '@tethys/cdk/dom';
import { helpers, isNumber } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import { ThyProgressGapPositionType, ThyProgressShapeType, ThyProgressStackedValue, ThyProgressType } from './interfaces';
import { THY_PROGRESS_COMPONENT, ThyParentProgress, ThyProgressStripComponent } from './progress-strip.component';

const typeColorMap = new Map([
    ['primary', '#6698ff'],
    ['success', '#73d897'],
    ['info', '#5dcfff'],
    ['warning', '#ffcd5d'],
    ['danger', '#ff7575']
]);

const sizeMap = new Map([
    ['xs', 4],
    ['sm', 6],
    ['md', 10],
    ['lg', 16]
]);
/**
 * 进度条组件
 * @name thy-progress
 */
@Component({
    selector: 'thy-progress',
    templateUrl: './progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: THY_PROGRESS_COMPONENT,
            useExisting: ThyProgressComponent
        }
    ],
    host: {
        class: `thy-progress progress`,
        '[class.thy-progress-strip]': `thyShape === 'strip'`,
        '[class.thy-progress-circle]': `thyShape === 'circle'`
    }
})
export class ThyProgressComponent implements ThyParentProgress, OnInit, OnChanges {
    value: number | ThyProgressStackedValue[];

    bars: ThyProgressStripComponent[] = [];

    barsTotalValue: number;

    private settedMax: number;

    private hostRenderer = useHostRenderer();

    @HostBinding('attr.max') max = 100;

    @HostBinding(`class.progress-stacked`) isStacked = false;

    @ViewChildren(ThyProgressStripComponent)
    set barsQueryList(value: QueryList<ThyProgressStripComponent>) {
        this.bars = value.toArray();
    }

    /**
     * 进度条类型: 'primary' | 'success' | 'info' | 'warning' | 'danger'
     */
    @Input() thyType: ThyProgressType = 'primary';

    /**
     * 进度条大小: `'sm' | 'md' 'xs'`
     * @default md
     */
    @Input() set thySize(size: string | number) {
        this.size = size;
        this.hostRenderer.updateClass(size ? [`progress-${size}`] : []);
    }

    /**
     * 进度值，传入数字时显示百分比 = value / max * 100, 当传入数组时显示多个 bar, stacked 模式的进度条
     */
    @Input() set thyValue(value: number | ThyProgressStackedValue[]) {
        // 自动求和计算 max
        if (Array.isArray(value)) {
            this.isStacked = true;
            this.value = [...value].filter(item => item.value !== 0);
            this.barsTotalValue = this.value.reduce((total, item) => {
                return total + item.value;
            }, 0);
            this.calculateMax();
        } else {
            this.value = value;
        }
    }

    /**
     * 最大值，主要计算百分比进度的分母使用，当 thyValue 传入数组时，自动累加数组中的 value 之和为 max
     */
    @Input() set thyMax(max: number) {
        this.settedMax = helpers.coerceNumberValue(max);
        this.calculateMax();
    }

    /**
     * 鼠标移入进度条时显示的提示文案或者模板
     */
    @Input() thyTips: string | TemplateRef<unknown>;

    /**
     * 进度形状 'strip' | 'circle'
     * @default strip
     */
    @Input() thyShape: ThyProgressShapeType = 'strip';

    /**
     * 圆形进度条缺口角度，可取值 0 ~ 360
     */
    @Input() thyGapDegree?: number = undefined;

    /**
     * 	圆形进度条缺口位置
     */
    @Input() thyGapPosition: ThyProgressGapPositionType = 'top';

    /**
     * 	圆形进度条线的宽度
     */
    @Input() thyStrokeWidth: number;

    size: string | number;

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {}

    calculateMax() {
        if (isNumber(this.settedMax) && this.settedMax > 0) {
            this.max = this.settedMax;
        } else {
            this.max = this.barsTotalValue;
        }
        if (this.max < this.barsTotalValue) {
            this.max = this.barsTotalValue;
        }
        this.bars.forEach(bar => {
            bar.recalculatePercentage();
        });
    }

    trackByFn(index: number) {
        return index;
    }
}
