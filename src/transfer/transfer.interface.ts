export type Direction = 'left' | 'right';

export enum TransferDirection {
    left = 'left',
    right = 'right'
}

export interface ThyTransferData {
    source: ThyTransferModel;
    target: ThyTransferModel;
}

export interface ThyTransferModel {
    title?: string;
    data: Array<any>;
}

/**
 * @public
 * @order 20
 */
export interface ThyTransferItem {
    /**
     * 数据标题
     */
    title: string;

    /**
     * 设置方向，可选值 [left,right]
     */
    direction?: Direction;

    order?: number | null;

    disabled?: boolean;

    /**
     * 选中状态
     */
    checked?: boolean;

    isLock?: boolean;

    groupId?: string;

    isFixed?: boolean;

    /**
     * 自定义数据
     */
    [key: string]: any;
}

export interface ThyTransferSelectEvent {
    item: ThyTransferItem;
}

export interface ThyTransferChangeEvent {
    from?: string;
    to?: string;
    items?: ThyTransferItem[];
    left?: InnerTransferList;
    right?: InnerTransferList;
}

export interface ThyTransferDragEvent {
    oldIndex?: number;
    newIndex?: number;
    model?: ThyTransferItem;
    models?: ThyTransferItem[];
    left?: InnerTransferList;
    right?: InnerTransferList;
}

export interface InnerTransferDragEvent {
    dragEvent?: ThyTransferDragEvent;
    listData?: InnerTransferList;
}

export interface InnerTransferList {
    lock?: ThyTransferItem[];
    unlock?: ThyTransferItem[];
}
