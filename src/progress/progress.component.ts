import { isNumber, isUndefinedOrNull } from 'ngx-tethys/util';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    TemplateRef,
    ViewEncapsulation,
    numberAttribute,
    input,
    viewChildren,
    effect
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyProgressGapPositionType, ThyProgressShapeType, ThyProgressStackedValue, ThyProgressType } from './interfaces';
import { THY_PROGRESS_COMPONENT, ThyParentProgress, ThyProgressStrip } from './progress-strip.component';
import { ThyProgressCircle } from './progress-circle.component';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { NgTemplateOutlet } from '@angular/common';

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
            useExisting: ThyProgress
        }
    ],
    host: {
        class: `thy-progress progress`,
        '[class.thy-progress-strip]': `thyShape() === 'strip'`,
        '[class.thy-progress-circle]': `thyShape() === 'circle'`,
        '[class.progress-stacked]': 'isStacked()',
        '[attr.max]': 'max()'
    },
    imports: [ThyProgressStrip, ThyTooltipDirective, NgTemplateOutlet, ThyProgressCircle]
})
export class ThyProgress implements ThyParentProgress {
    private hostRenderer = useHostRenderer();

    readonly barsTotalValue = computed(() => {
        const value = this.thyValue();
        if (Array.isArray(value)) {
            return value.reduce((total, item) => {
                return total + item.value;
            }, 0);
        }
        return undefined;
    });

    readonly max = computed(() => {
        const setMax = this.thyMax();
        const barsTotalValue = this.barsTotalValue();
        let result = 100;
        if (isNumber(setMax) && setMax > 0) {
            result = setMax;
        } else if (isNumber(barsTotalValue)) {
            result = barsTotalValue;
        }
        if (!isUndefinedOrNull(barsTotalValue) && result < barsTotalValue) {
            result = barsTotalValue;
        }
        return result;
    });

    readonly isStacked = computed(() => {
        return Array.isArray(this.thyValue());
    });

    readonly bars = viewChildren(ThyProgressStrip);

    /**
     * 进度条类型: `primary` | `success` | `info` | `warning` | `danger`
     */
    readonly thyType = input<ThyProgressType>('primary');

    /**
     * 进度条大小
     * @type xs | sm | md
     * @default md
     */
    readonly thySize = input<string | number>('md');

    /**
     * 进度值，传入数字时显示百分比 = value / max * 100，当传入数组时显示多个 bar，stacked 模式的进度条
     * @type number | ThyProgressStackedValue[]
     */
    readonly thyValue = input<number | ThyProgressStackedValue[], number | ThyProgressStackedValue[]>(undefined, {
        transform: (value: number | ThyProgressStackedValue[]) => {
            if (Array.isArray(value)) {
                return [...value].filter(item => item.value !== 0);
            } else {
                return value;
            }
        }
    });

    /**
     * 最大值，主要计算百分比进度的分母使用，当 thyValue 传入数组时，自动累加数组中的 value 之和为 max
     */
    readonly thyMax = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 鼠标移入进度条时显示的提示文案或者模板
     */
    readonly thyTips = input<string | TemplateRef<unknown> | undefined>(undefined);

    /**
     * 进度形状
     * @type strip | circle
     */
    readonly thyShape = input<ThyProgressShapeType>('strip');

    /**
     * 圆形进度条缺口角度，可取值 0 ~ 360
     */
    readonly thyGapDegree = input<number, unknown>(undefined, { transform: numberAttribute });

    /**
     * 圆形进度条缺口位置
     * @type top | bottom | left | right
     */
    readonly thyGapPosition = input<ThyProgressGapPositionType>('top');

    /**
     * 	圆形进度条线的宽度
     */
    readonly thyStrokeWidth = input<number, unknown>(undefined, { transform: numberAttribute });

    constructor() {
        effect(() => {
            const size = this.thySize();
            this.hostRenderer.updateClass(size ? [`progress-${size}`] : []);
        });
    }
}
