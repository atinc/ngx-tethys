import { Observable, isObservable } from 'rxjs';
import { Component, Input, Output, ViewEncapsulation, HostBinding, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';

import {
    ThyTransferItem,
    ThyTransferChangeEvent,
    ThyTransferSelectEvent,
    ThyTransferDragEvent,
    InnerTransferDragEvent,
    Direction,
    TransferDirection
} from './transfer.interface';

@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferComponent implements OnInit {
    @HostBinding('class') hostClass = 'thy-transfer';

    public leftDataSource: ThyTransferItem[] = [];

    public rightDataSource: ThyTransferItem[] = [];

    public allDataSource: ThyTransferItem[] = [];

    public leftTitle: string;

    public rightTitle: string;

    public rightDraggable = false;

    private _autoMove = true;

    @Input()
    set thyData(value: ThyTransferItem[]) {
        if (value) {
            this.initializeTransferData(value);
        }
    }

    @Input() thyrenderLeftTemplateRef: TemplateRef<any>;

    @Input() thyrenderRightTemplateRef: TemplateRef<any>;

    // @Input() transferToRight

    @Input()
    set thyTitles(value: string[]) {
        this.leftTitle = value[0] || '';
        this.rightTitle = value[1] || '';
    }

    @Input() thyRightCanLock: boolean;

    @Input() thyRightLockMax: number;

    // Currently not implemented, in order to support the selections move
    @Input()
    set thyAutoMove(value: boolean) {
        this._autoMove = value;
    }

    @Input() thyLeftDraggable: boolean;

    @Input() thyRightDraggable: boolean;

    @Output() thyDraggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    @Output() thyChange: EventEmitter<ThyTransferChangeEvent> = new EventEmitter<ThyTransferChangeEvent>();

    @ContentChild('renderTemplate') templateRef: TemplateRef<any>;

    @ContentChild('renderLeftTemplate') leftContentRef: TemplateRef<any>;

    @ContentChild('renderRightTemplate') rightContentRef: TemplateRef<any>;

    ngOnInit() {}

    initializeTransferData(data: ThyTransferItem[] = []) {
        this.allDataSource = [];
        this.leftDataSource = [];
        this.rightDataSource = [];
        data.forEach(item => {
            this.allDataSource.push(item);
            if (item.direction === TransferDirection.left) {
                this.leftDataSource.push(item);
            }
            if (item.direction === TransferDirection.right) {
                this.rightDataSource.push(item);
            }
        });
    }

    onSelect(from: Direction, event: ThyTransferSelectEvent) {
        if (event.item.isFixed) {
            return;
        }
        const to = from === TransferDirection.left ? TransferDirection.right : TransferDirection.left;
        event.item.checked = !event.item.checked;
        if (this._autoMove) {
            this.onMove(to);
        }
    }

    selectItem(event: ThyTransferSelectEvent) {
        this.onSelect(TransferDirection.left, event);
    }

    unselectItem(event: ThyTransferSelectEvent) {
        this.onSelect(TransferDirection.right, event);
    }

    private groupListByIsLock(list: ThyTransferItem[] = []) {
        const lock: ThyTransferItem[] = [],
            unlock: ThyTransferItem[] = [];
        list.forEach(item => {
            if (item.isLock) {
                lock.push(item);
            } else {
                unlock.push(item);
            }
        });
        return { lock: lock, unlock: unlock };
    }

    onMove(to: Direction) {
        const fromDataSource = to === TransferDirection.right ? this.leftDataSource : this.rightDataSource;
        const toDataSource = to === TransferDirection.right ? this.rightDataSource : this.leftDataSource;
        const selections = fromDataSource.filter(item => item.checked);
        const changeEvent: ThyTransferChangeEvent = {
            from: to === TransferDirection.right ? TransferDirection.left : TransferDirection.right,
            to: to,
            items: [...selections]
        };
        selections.forEach(item => {
            const index = fromDataSource.indexOf(item);
            const removed = fromDataSource.splice(index, 1)[0];
            removed.checked = !removed.checked;
            removed.direction = to;
            toDataSource.push(removed);
        });
        this.thyChange.emit({
            ...changeEvent,
            left: this.groupListByIsLock(this.leftDataSource),
            right: this.groupListByIsLock(this.rightDataSource)
        });
    }

    onDragUpdate(direction: Direction, event: InnerTransferDragEvent) {
        const otherDirectionData = direction === TransferDirection.left ? this.rightDataSource : this.leftDataSource;
        const otherListData = this.groupListByIsLock(otherDirectionData);
        this.thyDraggableUpdate.emit({
            ...event.dragEvent,
            left: direction === TransferDirection.left ? event.listData : otherListData,
            right: direction === TransferDirection.right ? event.listData : otherListData
        });
    }
}
