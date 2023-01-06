import { UpdateHostClassService } from 'ngx-tethys/core';
import { helpers, isNumber } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
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

import { THY_PROGRESS_COMPONENT, ThyParentProgress, ThyProgressBarComponent } from './bar/progress-bar.component';
import {
    ThyProgressCirclePath,
    ThyProgressGapPositionType,
    ThyProgressPathStyle,
    ThyProgressShapeType,
    ThyProgressStackedValue,
    ThyProgressType
} from './interfaces';

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
        UpdateHostClassService,
        {
            provide: THY_PROGRESS_COMPONENT,
            useExisting: ThyProgressComponent
        }
    ],
    host: {
        class: 'thy-progress progress',
        '[class.thy-progress-circle]': `thyShape === 'circle'`
    }
})
export class ThyProgressComponent implements ThyParentProgress, OnInit, OnChanges {
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
        this.size = size;
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

    /**
     * 进度形状 'strip' | 'circle'
     */
    @Input() thyShape: ThyProgressShapeType = 'strip';

    /**
     * 仪表盘进度条缺口角度，可取值 0 ~ 360
     */
    @Input() thyGapDegree?: number = undefined;

    /**
     * 	仪表盘进度条缺口位置
     */
    @Input() thyGapPosition: ThyProgressGapPositionType = 'top';

    public trailPathStyle: ThyProgressPathStyle | null = null;

    public progressCirclePath: ThyProgressCirclePath[];

    public pathString?: string;

    public width: number;

    private size: string;

    get strokeWidth(): number {
        return sizeMap.get(this.size) || 6;
    }

    constructor(private updateHostClassService: UpdateHostClassService, public elementRef: ElementRef) {
        this.updateHostClassService.initializeElement(elementRef);
    }

    ngOnInit() {
        const { offsetWidth, offsetHeight } = this.elementRef.nativeElement;
        this.width = (offsetHeight < offsetWidth ? offsetHeight : offsetWidth) || 150;
        this.getCirclePaths();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyGapDegree, thyValue, thyGapPosition } = changes;

        if (thyGapDegree || thyValue || thyGapPosition) {
            this.getCirclePaths();
        }
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

    private getCirclePaths(): void {
        if (this.thyShape !== 'circle') {
            return;
        }
        let values: ThyProgressStackedValue[] = [];

        if (Array.isArray(this.value)) {
            let totalValue = 0;
            values = ((this.value as unknown) as ThyProgressStackedValue[]).map((item, index) => {
                totalValue += item.value;
                return { ...item, value: totalValue };
            });
        } else {
            values = [{ value: this.value }];
        }

        const radius = 50 - this.strokeWidth / 2;
        const gapPosition = this.thyGapPosition || 'top';
        const len = Math.PI * 2 * radius;
        const gapDegree = this.thyGapDegree || 0;

        let beginPositionX = 0;
        let beginPositionY = -radius;
        let endPositionX = 0;
        let endPositionY = radius * -2;

        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }

        this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

        this.trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };

        this.progressCirclePath = values
            .map((item, index) => {
                return {
                    stroke: null,
                    strokePathStyle: {
                        stroke: item.type || this.thyType ? typeColorMap.get(item.type || this.thyType) : item?.color || null,
                        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                        strokeDasharray: `${((item.value || 0) / 100) * (len - gapDegree)}px ${len}px`,
                        strokeDashoffset: `-${gapDegree / 2}px`
                    }
                };
            })
            .reverse();
    }

    trackByFn(index: number) {
        return index;
    }
}
