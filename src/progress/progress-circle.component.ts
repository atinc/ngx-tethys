import { isString } from 'ngx-tethys/util';

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

const circleMap = new Map([
    ['xs', 44],
    ['sm', 80],
    ['md', 112],
    ['lg', 160]
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
    @Input() set thyType(type: ThyProgressType) {
        this.updateHostClassService.updateClass(type ? [`progress-circle-${type}`] : []);
    }

    @Input() set thySize(size: string | number) {
        this.size = size;
        this.width = size ? (isString(size) ? circleMap.get(size) : size) : 112;
    }

    @Input() thyValue: number | ThyProgressStackedValue[];

    @Input() thyMax: number;

    @Input() thyTips: string | TemplateRef<unknown>;

    @Input() thyShape: ThyProgressShapeType = 'strip';

    @Input() thyGapDegree?: number = undefined;

    @Input() thyGapPosition: ThyProgressGapPositionType = 'top';

    @Input() thyStrokeWidth: number;

    public trailPathStyle: ThyProgressPathStyle | null = null;

    public progressCirclePath: ThyProgressCirclePath[];

    public pathString?: string;

    public width: number = 150;

    private size: string | number;

    get strokeWidth(): number {
        return this.thyStrokeWidth || 6;
    }

    constructor(private updateHostClassService: UpdateHostClassService, public elementRef: ElementRef) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this.createCirclePaths();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyGapDegree, thyValue, thyGapPosition } = changes;

        if (thyGapDegree || thyValue || thyGapPosition) {
            this.createCirclePaths();
        }
    }

    private createCirclePaths(): void {
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
