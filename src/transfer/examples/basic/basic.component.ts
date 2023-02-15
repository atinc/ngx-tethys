import { Component, OnInit } from '@angular/core';
import { TransferDirection, ThyTransferItem, ThyTransferDragEvent } from 'ngx-tethys/transfer';
@Component({
    selector: 'thy-transfer-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTransferBasicExampleComponent implements OnInit {
    public transferData: ThyTransferItem[] = [
        {
            _id: 1,
            title: '第1条数据-必选不可移除',
            direction: TransferDirection.right,
            icon: 'more-circle',
            required: true
        },
        {
            _id: 2,
            title: '第2条数据-disabled',
            disabled: true,
            direction: TransferDirection.left
        },
        {
            _id: 3,
            title: '第3条数据',
            direction: TransferDirection.left
        },
        {
            _id: 4,
            title: '第4条数据',
            direction: TransferDirection.left
        },
        {
            _id: 5,
            title: '第5条数据',
            direction: TransferDirection.right
        },
        {
            _id: 6,
            title: '第6条数据',
            direction: TransferDirection.left
        },
        {
            _id: 7,
            title: '第7条数据',
            direction: TransferDirection.right
        },
        {
            _id: 8,
            title: '第8条数据',
            direction: TransferDirection.right
        },
        {
            _id: 9,
            title: '第9条数据',
            direction: TransferDirection.right
        }
    ];

    constructor() {}

    ngOnInit() {}

    onDraggableUpdate(event: ThyTransferDragEvent) {
        console.log(event);
    }

    onTransferChange(event: ThyTransferDragEvent) {
        console.log(event);
    }

    canCheckLeftItemFn(item: ThyTransferItem, selectData: ThyTransferItem[]) {
        // return item._id !== 2 && selectData.length < 6;
        return true;
    }

    canUncheckRightItemFn(item: ThyTransferItem, selectData: ThyTransferItem[]) {
        // return selectData.length > 3;
        return true;
    }

    canUnCheckLeftItemFn(item: ThyTransferItem, selectData: ThyTransferItem[]) {}

    public trackBy(index: number, item: ThyTransferItem) {
        return item?._id || item?.key || index;
    }
}
