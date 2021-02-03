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
    /** tip Component ,default is ThyGuiderTooltip */
    hintComponent?: Type<unknown>;

    /** steps info */
    steps: ThyGuiderStep[];

    /** tip default position when step info not set tipPlacement */
    hintPlacement?: ThyPlacement;

    /** the priority is higher than tipPlacement */
    defaultPosition?: [number, number];

    /** setting default point offset */
    pointOffset?: [number, number];

    hintOffset?: number;
}

export const defaultGuiderPositionConfig = {
    hintComponent: null as Type<unknown>,
    hintPlacement: 'rightBottom',
    defaultPosition: [0, 0],
    pointOffset: [0, 0],
    hintOffset: 4
};
