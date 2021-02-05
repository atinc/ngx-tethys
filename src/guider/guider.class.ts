import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

// export type StepTipData = {
//     [key: string]: any;
//     title?: string;
//     description?: string | TemplateRef<any>;
//     image?: string;
// };

export interface ThyGuiderStep<TData = any> {
    key: string;
    target?: string | [number, number];
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
}

export const defaultGuiderPositionConfig = {
    hintComponent: null as Type<unknown>,
    hintPlacement: 'rightBottom',
    defaultPosition: [0, 0],
    pointOffset: [0, 0],
    hintOffset: 4
};
