import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';

import { UpdateHostClassService } from '../core';
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
 * @private
 */
@Component({
    selector: 'thy-progress-circle',
    templateUrl: './progress-circle.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [UpdateHostClassService],
    host: {
        class: 'progress-circle'
    }
})
export class ThyProgressCircleComponent implements OnInit, OnChanges {
    /**
     * 进度条类型: 'primary' | 'success' | 'info' | 'warning' | 'danger'
     */
    @Input() set thyType(type: ThyProgressType) {
        this.updateHostClassService.updateClass(type ? [`progress-circle-${type}`] : []);
    }

    /**
     * 进度条大小: `'sm' | 'md' 'xs'`
     * @default md
     */
    @Input() set thySize(size: string) {
        this.size = size;
    }

    /**
     * 进度值
     */
    @Input() thyValue: number | ThyProgressStackedValue[];

    /**
     * 最大值，主要计算百分比进度的分母使用，当 thyValue 传入数组时，自动累加数组中的 value 之和为 max
     */
    @Input() thyMax: number;

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
        updateHostClassService.initializeElement(elementRef.nativeElement);
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

    private getCirclePaths(): void {
        let values: ThyProgressStackedValue[] = [];

        if (Array.isArray(this.thyValue)) {
            let totalValue = 0;
            values = ((this.thyValue as unknown) as ThyProgressStackedValue[]).map((item, index) => {
                totalValue += item.value;
                const currentValue = this.thyMax && this.thyMax > 100 ? +((totalValue / this.thyMax) * 100).toFixed(2) : totalValue;
                return { ...item, value: currentValue };
            });
        } else {
            values = [{ value: this.thyValue }];
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

        this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY} a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

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
                        stroke: item?.color ? item?.color : item.type ? typeColorMap.get(item.type) : null,
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
