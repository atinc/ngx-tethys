import { Type } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

export enum StepActionType {
    NEXT = 'NEXT',
    PREV = 'PREV'
}

export const NOT_SET_POSITION = 'NOT_SET_POSITION';
export interface StepInfo {
    key: string;
    target: string; // directive
    data: any;
    highLightPosition?: GuiderPosition;
    hintPosition?: GuiderPosition;
    // children: StepInfo<T>[]
}

export interface GuiderOptionInfo {
    component: Type<unknown>;
    steps: StepInfo[];
    startWith?: string;
    highLightDefaultPosition?: GuiderPosition;
    hintDefaultPosition?: GuiderPosition;
}

export type GuiderPosition = ThyPlacement | number[] | string;
