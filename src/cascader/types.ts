import { Id } from 'ngx-tethys/types';

export interface ThyCascaderOption {
    value?: any;
    label?: string;
    title?: string;
    disabled?: boolean;
    loading?: boolean;
    isLeaf?: boolean;
    parent?: ThyCascaderOption;
    children?: ThyCascaderOption[];
    indeterminate?: boolean;
    [key: string]: any;
}

export type ThyCascaderTriggerType = 'click' | 'hover';

export type ThyCascaderExpandTrigger = 'click' | 'hover';

export interface ThyCascaderSearchOption {
    labelList: string[];
    valueList: Id[];
    selected: boolean;
    thyRowValue: ThyCascaderOption[];
    isLeaf?: boolean;
    disabled?: boolean;
}
