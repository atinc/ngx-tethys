import {
    Component,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    ContentChild,
    TemplateRef,
    OnInit
} from '@angular/core';

import {
    ThyTransferItem,
    ThyTransferChangeEvent,
    ThyTransferSelectEvent,
    ThyTransferDragEvent,
    InnerTransferDragEvent
} from './transfer.interface';

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

    @Input() thyRightCanLock: boolean;

    @Input() thyRightLockMax: number;

    @Input()
    set thyAutoMove(value: boolean) {
        this._autoMove = value;
    }

    // 暂时没有实现
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

    ngOnInit() {}

    initializeTransferData(data: ThyTransferItem[]) {
        this.leftDataSource = data.filter(item => {
            return item.direction === TransferDirection.left;
        });
        this.rightDataSource = data.filter(item => {
            return item.direction === TransferDirection.right;
        });
    }

    onSelect(from: string, event: ThyTransferSelectEvent) {
        const to = from === TransferDirection.left ? TransferDirection.right : TransferDirection.left;
        event.item.checked = !event.item.checked;
        if (this._autoMove) {
            this.onMove(to);
        }
    }

    onMove(to: string) {
        const from = to === TransferDirection.right ? TransferDirection.left : TransferDirection.right;
        const fromDataSource = to === TransferDirection.right ? this.leftDataSource : this.rightDataSource;
        const toDataSource = to === TransferDirection.right ? this.rightDataSource : this.leftDataSource;
        const selections = fromDataSource.filter(item => item.checked);
        const changeEvent: ThyTransferChangeEvent = {
            from: from,
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
            left: {
                lock: this.leftDataSource.filter(item => item.isLock),
                unlock: this.leftDataSource.filter(item => !item.isLock)
            },
            right: {
                lock: this.rightDataSource.filter(item => item.isLock),
                unlock: this.rightDataSource.filter(item => !item.isLock)
            }
        });
    }

    onDragUpdate(direction: Direction, event: InnerTransferDragEvent) {
        const otherDirectionData = direction === TransferDirection.left ? this.rightDataSource : this.leftDataSource;
        const otherListData = {
            lock: otherDirectionData.filter(item => item.isLock),
            unlock: otherDirectionData.filter(item => !item.isLock)
        };
        this.thyDraggableUpdate.emit({
            ...event.dragEvent,
            left: direction === TransferDirection.left ? event.listData : otherListData,
            right: direction === TransferDirection.right ? event.listData : otherListData
        });
    }
}

type Direction = 'left' | 'right';

export enum TransferDirection {
    left = 'left',
    right = 'right'
}
