import { TemplateRef, Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

// TODO 抛出的 type/interface 需要添加 ThyGuider**，比如 ThyGuiderStepInfo
export type StepTipData = {
    [key: string]: any;
    title?: string;
    description?: string | TemplateRef<any>;
    image?: string;
};

export type GuiderPlacement = ThyPlacement | GuiderTargetPosition;

export type GuiderTargetPosition = [number, number];

export type GuiderOffset = [number, number];

export const defaultTipPlacement = 'rightBottom';

export const defaultTipPosition = [0, 0] as GuiderTargetPosition;

export const pointOffset = [0, 0] as GuiderOffset;

export interface StepInfo {
    key: string;
    target?: string; // directive
    data: StepTipData;
    // 只使用 offset 来控制 point 高亮点的位置
    // targetPosition?: GuiderTargetPosition;
    // 当 target 为空时，需要设置 tipPlacement 为 GuiderTargetPosition
    tipPlacement?: GuiderPlacement;
    tipOffset?: number;
    pointOffset?: GuiderOffset;
    // children: StepInfo<T>[]
}

// TODO 像 popoverConfig 一样，配置一个默认 config的对象，在初始化的时候使用 assign 统一配置默认值

export class ThyGuiderConfig {
    /** tooltip Component ,default is ThyGuiderTooltip */
    component?: Type<unknown>;

    /** steps info */
    steps: StepInfo[];

    /** tooltip default position when step info not set tipPlacement */
    tipPlacement?: ThyPlacement;

    /** the priority is higher than tipPlacement */
    tipPosition?: GuiderTargetPosition;

    /** setting default point offset */
    pointOffset?: GuiderOffset;

    tipOffset?: number;
}
