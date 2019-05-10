export interface ThyTransferData {
    source: ThyTransferModel;
    target: ThyTransferModel;
}

export interface ThyTransferModel {
    title?: string;
    data: Array<any>;
}

export interface ThyTransferItem {
    title: string;
    direction?: string;
    order?: number;
    disabled?: boolean;
    checked?: boolean;
    isLock?: boolean;
    groupId?: string;
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
