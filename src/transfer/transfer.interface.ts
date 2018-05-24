import { TransferDirection } from './transfer.component';

export interface ThyTransferData {
    source: ThyTransferModel;
    target: ThyTransferModel;
}

export interface ThyTransferModel {
    title?: string;
    data: | Array<any>;
}

export interface ThyTransferItem {
    title: string;
    direction?: TransferDirection;
    order?: number;
    disabled?: boolean;
    checked?: boolean;
    [key: string]: any;
}

export interface ThyTransferSelectEvent {
    item: ThyTransferItem;
}


export interface ThyTransferChangeEvent {
    from: TransferDirection;
    to: TransferDirection;
    items?: ThyTransferItem[];
}

export interface ThyTransferDragEvent {
    oldIndex?: number;
    newIndex?: number;
    model?: ThyTransferItem;
    models?: ThyTransferItem[];
}
