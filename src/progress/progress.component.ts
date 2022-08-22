import {
    Component,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    ElementRef,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
    TemplateRef
} from '@angular/core';
import { ThyProgressType, ThyProgressStackedValue } from './interfaces';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { THY_PROGRESS_COMPONENT, ThyProgressBarComponent, ThyParentProgress } from './bar/progress-bar.component';
import { helpers, isNumber } from 'ngx-tethys/util';

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
        UpdateHostClassService,
        {
            provide: THY_PROGRESS_COMPONENT,
            useExisting: ThyProgressComponent
        }
    ],
    host: {
        class: 'thy-progress progress'
    }
})
export class ThyProgressComponent implements ThyParentProgress {
    value: number | ThyProgressStackedValue[];

    bars: ThyProgressBarComponent[] = [];

    barsTotalValue: number;

    private settedMax: number;

    @HostBinding('attr.max') max = 100;

    @HostBinding(`class.progress-stacked`) isStacked = false;

    @ViewChildren(ThyProgressBarComponent)
    set barsQueryList(value: QueryList<ThyProgressBarComponent>) {
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
    @Input() set thySize(size: string) {
        this.updateHostClassService.updateClass(size ? [`progress-${size}`] : []);
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

    constructor(private updateHostClassService: UpdateHostClassService, elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef);
    }

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
}
