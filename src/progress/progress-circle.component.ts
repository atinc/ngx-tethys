import { isNumber, isString } from 'ngx-tethys/util';

import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    numberAttribute,
    input,
    effect,
    computed
} from '@angular/core';
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
    imports: [ThyTooltipDirective, NgClass, NgStyle]
})
export class ThyProgressCircle implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    readonly thyType = input<ThyProgressType>(undefined);

    readonly thySize = input<string | number>(undefined);

    readonly thyValue = input<number | ThyProgressStackedValue[]>(undefined);

    readonly thyMax = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly thyTips = input<string | TemplateRef<unknown>>(undefined);

    readonly thyShape = input<ThyProgressShapeType>('strip');

    readonly thyGapDegree = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly thyGapPosition = input<ThyProgressGapPositionType>('top');

    readonly thyStrokeWidth = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly strokeWidth = computed(() => {
        return this.thyStrokeWidth() || 6;
    });

    readonly progressSize = computed(() => {
        const size = this.thySize();
        if (size && isString(size)) {
            return `progress-circle-inner-${size}`;
        }
        return '';
    });

    readonly width = computed(() => {
        const size = this.thySize();
        if (size && isNumber(size)) {
            return size;
        }
        return 112;
    });

    readonly circle = computed(() => {
        let values: ThyProgressStackedValue[] = [];

        const thyValue = this.thyValue();
        if (Array.isArray(thyValue)) {
            let totalValue = 0;
            values = (thyValue as ThyProgressStackedValue[]).map((item, index) => {
                totalValue += item.value;
                const currentValue = +((totalValue / this.thyMax()) * 100).toFixed(2);
                return { ...item, value: currentValue };
            });
        } else {
            values = [{ value: thyValue }];
        }

        const radius = 50 - this.strokeWidth() / 2;
        const gapPosition = this.thyGapPosition() || 'top';
        const len = Math.PI * 2 * radius;
        const gapDegree = this.thyGapDegree() || 0;

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

        const pathString = `M 50,50 m ${beginPositionX},${beginPositionY} a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY} a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

        const trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };

        const progressCirclePath = values
            .map((item, index) => {
                return {
                    stroke: '',
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
        return { pathString, trailPathStyle, progressCirclePath };
    });

    constructor() {
        effect(() => {
            const type = this.thyType();
            this.hostRenderer.updateClass(type ? [`progress-circle-${type}`] : []);
        });
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {}
}
