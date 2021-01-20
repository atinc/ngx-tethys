import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export type stepTipData = any;

export type GuiderPlacement = ThyPlacement | GuiderOriginPosition;

export type GuiderOriginPosition = [number, number];

export const tipDefaultPosition = 'right';

export const pointDefaultPosition = [0, 0] as GuiderOriginPosition;

export interface StepInfo {
    key: string;
    target: string; // directive
    data: stepTipData;
    pointPosition?: GuiderOriginPosition;
    // 当 target 为空时，需要设置 tipPosition 为 GuiderOriginPosition
    tipPosition?: GuiderPlacement;
    tipOffset?: number;
    // children: StepInfo<T>[]
}

export class ThyGuiderConfig {
    /** tooltip Component ,default is ThyGuiderTooltip */
    component: Type<unknown>;

    /** steps info */
    steps: StepInfo[];

    /** point default position */
    pointDefaultPosition?: GuiderOriginPosition;

    /** tooltip default position when step info not set tipPosition */
    tipDefaultPosition?: GuiderPlacement;

    /** 当  tipDefaultPosition 类型为 ThyPlacement 时，配置的 tipDefaultOffset 才会起作用*/
    tipDefaultOffset?: number;
}
