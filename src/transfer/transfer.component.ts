import {
    Component, Input, Output, ElementRef, ViewEncapsulation, HostBinding,
    EventEmitter, ContentChild, TemplateRef, OnInit
} from '@angular/core';

import { ThyTransferItem, ThyTransferChangeEvent, ThyTransferSelectEvent, ThyTransferDragEvent } from './transfer.interface';
import { SortablejsOptions } from 'angular-sortablejs/dist';

@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferComponent implements OnInit {

    @HostBinding('class') hostClass = 'thy-transfer';

    public leftDataSource: ThyTransferItem[];

    public rightDataSource: ThyTransferItem[];

    public leftTitle: string;

    public rightTitle: string;

    public leftDraggable = false;

    public rightDraggable = false;

    private _canMove: Function;

    private _autoMove = true;

    @Input()
    set thyData(value: ThyTransferItem[]) {
        if (value) {
            this.initializeTransferData(value);
        }
    }

    @Input()
    set thyTitles(value: string[]) {
        this.leftTitle = value[0] || '';
        this.rightTitle = value[1] || '';
    }

    @Input()
    set thyAutoMove(value: boolean) {
        this._autoMove = value;
    }

    @Input()
    set thyCanMove(value: Function) {
        this._canMove = value;
    }

    @Input()
    set thyLeftDraggable(value: boolean) {
        this.leftDraggable = value;
    }

    @Input()
    set thyRightDraggable(value: boolean) {
        this.rightDraggable = value;
    }

    @Output() thyDraggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    @Output() thyChange: EventEmitter<ThyTransferChangeEvent> = new EventEmitter<ThyTransferChangeEvent>();

    @ContentChild('renderTemplate') templateRef: TemplateRef<any>;

    ngOnInit() {
    }

    initializeTransferData(data: ThyTransferItem[]) {
        this.leftDataSource = data.filter((item) => {
            return item.direction === TransferDirection.left;
        });
        this.rightDataSource = data.filter((item) => {
            return item.direction === TransferDirection.right;
        });
    }

    onSelect(from: string, event: ThyTransferSelectEvent) {
        const to = (from === TransferDirection.left) ? TransferDirection.right : TransferDirection.left;
        event.item.checked = !event.item.checked;
        if (this._autoMove) {
            this.onMove(to);
        }
    }


    onMove(to: string) {
        const from = (to === TransferDirection.right) ? TransferDirection.left : TransferDirection.right;
        const leftDataSource = (to === TransferDirection.right) ? this.leftDataSource : this.rightDataSource;
        const rightDataSource = (to === TransferDirection.right) ? this.rightDataSource : this.leftDataSource;
        const selections = leftDataSource.filter(item => item.checked);
        const changeEvent: ThyTransferChangeEvent = {
            from: from,
            to: to,
            items: [...selections]
        };
        selections.forEach(item => {
            const index = leftDataSource.indexOf(item);
            const removed = leftDataSource.splice(index, 1)[0];
            removed.checked = !removed.checked;
            removed.direction = to;
            rightDataSource.push(removed);
        });
        this.thyChange.emit(changeEvent);
    }

    onDragUpdate(event: ThyTransferDragEvent) {
        this.thyDraggableUpdate.emit(event);
    }
}

export enum TransferDirection {
    left = 'left',
    right = 'right'
}
