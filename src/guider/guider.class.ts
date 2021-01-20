import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export const NOT_SET_POSITION = 'NOT_SET_POSITION';

export type stepTipData = any;

export type GuiderPlacement = ThyPlacement | number[] | string;

export interface StepInfo {
    key: string;
    target: string; // directive
    data: stepTipData;
    pointPosition?: GuiderPlacement;
    tipPosition?: GuiderPlacement;
    // children: StepInfo<T>[]
}

export class ThyGuiderConfig {
    /** tooltip Component ,default is ThyGuiderTooltip */
    component: Type<unknown>;

    /** steps info */
    steps: StepInfo[];

    /** point default position */
    pointDefaultPosition?: GuiderPlacement;

    /** tooltip default position when step info not set tipPosition */
    tipDefaultPosition?: GuiderPlacement;

    /** Origin point, default use origin's boundingClientRect*/
    // originPosition?: {
    //     x: number;
    //     y: number;
    // } & { width?: number; height?: number };

    /** Placement be relative to origin, topCenter, topLeft, topRight, bottomCenter, bottomLeft, bottomRight ...*/
    // placement?: ThyPlacement;
    /** Offset be relative to origin, default is 4*/
    // offset?: number;
}
