import { isString } from 'ngx-tethys/util';

import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewEncapsulation, numberAttribute } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import {
    ThyProgressCirclePath,
    ThyProgressGapPositionType,
    ThyProgressPathStyle,
    ThyProgressShapeType,
    ThyProgressStackedValue,
    ThyProgressType
} from './interfaces';
import { NgClass, NgStyle } from '@angular/common';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

/**
 * @private
 */
@Component({
    selector: 'thy-progress-circle',
    templateUrl: './progress-circle.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'progress-circle'
    },
    standalone: true,
    imports: [ThyTooltipDirective, NgClass, NgStyle]
})
export class ThyProgressCircle implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    @Input() set thyType(type: ThyProgressType) {
        this.hostRenderer.updateClass(type ? [`progress-circle-${type}`] : []);
    }

    @Input() set thySize(size: string | number) {
        if (size) {
            if (isString(size)) {
                this.progressSize = `progress-circle-inner-${size}`;
            } else {
                this.width = size;
            }
        }
    }

    @Input() thyValue: number | ThyProgressStackedValue[];

    @Input({ transform: numberAttribute }) thyMax: number;

    @Input() thyTips: string | TemplateRef<unknown>;

    @Input() thyShape: ThyProgressShapeType = 'strip';

    @Input({ transform: numberAttribute }) thyGapDegree?: number = undefined;

    @Input() thyGapPosition: ThyProgressGapPositionType = 'top';

    @Input({ transform: numberAttribute }) thyStrokeWidth: number;

    public trailPathStyle: ThyProgressPathStyle | null = null;

    public progressCirclePath: ThyProgressCirclePath[];

    public pathString?: string;

    public width: number = 112;

    public progressSize: string;

    get strokeWidth(): number {
        return this.thyStrokeWidth || 6;
    }

    public value: number | ThyProgressStackedValue[];

    constructor() {}

    ngOnInit() {
        this.createCircleProgress();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thyGapDegree, thyValue, thyGapPosition } = changes;

        if (thyGapDegree || thyValue || thyGapPosition) {
            this.createCircleProgress();
        }
    }

    private createCircleProgress(): void {
        let values: ThyProgressStackedValue[] = [];

        if (Array.isArray(this.thyValue)) {
            let totalValue = 0;
            values = (this.thyValue as unknown as ThyProgressStackedValue[]).map((item, index) => {
                totalValue += item.value;
                const currentValue = +((totalValue / this.thyMax) * 100).toFixed(2);
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
                    value: +item.value,
                    className: item.type ? `progress-circle-path-${item.type}` : null,
                    strokePathStyle: {
                        stroke: item?.color ? item?.color : null,
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
