import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TransferDirection, ThyTransfer, ThyTransferItem, ThyTransferDragEvent } from 'ngx-tethys/transfer';

@Component({
    selector: 'thy-transfer-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTransfer]
})
export class ThyTransferBasicExampleComponent implements OnInit {
    public lockItems: WritableSignal<ThyTransferItem[]> = signal([]);

    public unlockItems: WritableSignal<ThyTransferItem[]> = signal([]);

    public maxLock = 2;

    public selectedLeft: ThyTransferItem[] = [];

    public transferData: ThyTransferItem[] = [
        {
            id: 1,
            title: '第1条数据',
            direction: TransferDirection.right
        },
        {
            id: 2,
            title: '第2条数据',
            direction: TransferDirection.left
        },
        {
            id: 3,
            title: '第3条数据',
            direction: TransferDirection.left
        },
        {
            id: 4,
            title: '第4条数据',
            direction: TransferDirection.left
        },
        {
            id: 5,
            title: '第5条数据',
            direction: TransferDirection.right
        },
        {
            id: 6,
            title: '第6条数据',
            direction: TransferDirection.left
        },
        {
            id: 7,
            title: '第7条数据',
            direction: TransferDirection.right
        },
        {
            id: 8,
            title: '第8条数据',
            direction: TransferDirection.right,
            isFixed: true
        },
        {
            id: 9,
            title: '第9条数据',
            direction: TransferDirection.right,
            isLock: true
        }
    ];

    constructor() {}

    ngOnInit() {
        this.lockItems.set(this.transferData.filter(e => e.isLock));
        this.unlockItems.set(this.transferData.filter(e => e.direction === TransferDirection.right && !e.isLock));
    }

    onDragUpdate(event: ThyTransferDragEvent) {
        this.lockItems.set(event.right?.lock ?? []);
        this.unlockItems.set(event.right?.unlock ?? []);
        console.log(event);
    }

    onTransferChange(event: ThyTransferDragEvent) {
        this.lockItems.set(event.right?.lock ?? []);
        this.unlockItems.set(event.right?.unlock ?? []);
        console.log(event);
    }

    select(item: ThyTransferItem, selectItem: (item: ThyTransferItem) => void, unselectItem: (item: ThyTransferItem) => void) {
        if (item.direction === TransferDirection.left) {
            selectItem(item);
        } else {
            unselectItem(item);
        }
    }
}
