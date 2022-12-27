export interface ThyCascaderOption {
    value?: any;
    label?: string;
    title?: string;
    disabled?: boolean;
    loading?: boolean;
    isLeaf?: boolean;
    parent?: ThyCascaderOption;
    children?: ThyCascaderOption[];
    [key: string]: any;
}

export type ThyCascaderTriggerType = 'click' | 'hover';

export type ThyCascaderExpandTrigger = 'click' | 'hover';
