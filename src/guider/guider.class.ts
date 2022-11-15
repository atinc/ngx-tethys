import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export interface ThyGuiderStep<TData = any> {
    key: string;
    target?: string | string[] | [number, number];
    data: TData;
    route?: string;
    hintPlacement?: ThyPlacement;
    hintOffset?: number;
    pointOffset?: [number, number];
    // children: StepInfo<T>[]
}

export class ThyGuiderConfig {
    /** hint Component,default is ThyGuiderHintComponent */
    hintComponent?: Type<unknown>;

    /** steps info */
    steps: ThyGuiderStep[];

    /** hint default position when step info not set hintPlacement */
    hintPlacement?: ThyPlacement;

    /** useful when without target */
    defaultPosition?: [number, number];

    /** setting default point offset */
    pointOffset?: [number, number];

    /** like popover offset */
    hintOffset?: number;

    /** popover active class */
    hintClass?: string | string[];

    /** guider point class */
    pointClass?: string | string[];
}

export const defaultGuiderPositionConfig = {
    hintComponent: null as Type<unknown>,
    hintPlacement: 'rightBottom',
    defaultPosition: [0, 0],
    pointOffset: [0, 0],
    hintOffset: 4
};
