export type Direction = 'left' | 'right';

export enum TransferDirection {
    left = 'left',
    right = 'right'
}
export interface ThyTransferItem {
    title?: string;
    direction?: Direction;
    order?: number;
    disabled?: boolean;
    checked?: boolean;
    groupId?: string;
    [key: string]: any;
}

export interface ThyTransferChangeEvent {
    from?: string;
    to?: string;
    item?: ThyTransferItem;
    left?: ThyTransferItem[];
    right?: ThyTransferItem[];
}

export interface ThyTransferDragEvent {
    oldIndex?: number;
    newIndex?: number;
    model?: ThyTransferItem;
    models?: ThyTransferItem[];
    direction?: Direction;
}

export interface InnerTransferDragEvent {
    dragEvent?: ThyTransferDragEvent;
}
