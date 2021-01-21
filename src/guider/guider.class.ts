import { TemplateRef, Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

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

export const pointDefaultPosition = [0, 0] as GuiderTargetPosition;

export interface StepInfo {
    key: string;
    target?: string; // directive
    data: StepTipData;
    targetPosition?: GuiderTargetPosition;
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

    /** point default position */
    // TODO 命名方式与 stepInfo 相同
    pointDefaultPosition?: GuiderTargetPosition;

    /** tooltip default position when step info not set tipPlacement */
    defaultTipPlacement?: GuiderPlacement;

    /** 当  tipDefaultPosition 类型为 ThyPlacement 时，配置的 tipDefaultOffset 才会起作用*/
    tipDefaultOffset?: number;
}
