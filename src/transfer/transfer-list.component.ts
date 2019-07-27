import {
    Component,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    TemplateRef,
    IterableDiffer,
    IterableDiffers,
    OnInit,
    OnDestroy,
    DoCheck,
    IterableChanges
} from '@angular/core';
import {
    ThyTransferSelectEvent,
    ThyTransferItem,
    ThyTransferDragEvent,
    InnerTransferDragEvent
} from './transfer.interface';
import { ThyTransferComponent } from './transfer.component';
import { SortablejsOptions } from 'angular-sortablejs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'thy-transfer-list',
    templateUrl: './transfer-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferListComponent implements OnInit, DoCheck {
    public lockItems: ThyTransferItem[] = [];

    public unlockItems: ThyTransferItem[] = [];

    private _diff: IterableDiffer<ThyTransferItem>;

    private _lockDiff: IterableDiffer<ThyTransferItem>;

    private _unlockDiff: IterableDiffer<ThyTransferItem>;

    @Input() title: string;

    @Input() items: ThyTransferItem[];

    @Input() draggable: boolean;

    @Input() canLock: boolean;

    @Input() maxLock: number;

    @Input() template: TemplateRef<any>;

    @Output() draggableUpdate: EventEmitter<InnerTransferDragEvent> = new EventEmitter<InnerTransferDragEvent>();

    @HostBinding('class') hostClass = 'thy-transfer-list';

    constructor(private root: ThyTransferComponent, private differs: IterableDiffers) {}

    ngOnInit() {
        this._combineTransferData();
        if (this.canLock) {
            this._lockDiff = this.differs.find(this.lockItems).create();
            this._unlockDiff = this.differs.find(this.unlockItems).create();
        } else {
            this._unlockDiff = this.differs.find(this.unlockItems).create();
        }
        this._diff = this.differs.find(this.items).create();
    }

    private _combineTransferData() {
        this.lockItems = [];
        this.unlockItems = [];
        if (this.canLock) {
            (this.items || []).forEach(item => {
                if (item.isLock) {
                    this.lockItems.push(item);
                } else {
                    this.unlockItems.push(item);
                }
            });
        } else {
            this.unlockItems = this.items;
        }
    }

    private _afterChangeItems(changes: IterableChanges<ThyTransferItem>, items: ThyTransferItem[]) {
        // 数据发生变化时，更改order值
        changes.forEachAddedItem(record => {
            record.item.order = record.currentIndex;
        });
        changes.forEachRemovedItem(() => {
            items.forEach((item, index) => {
                item.order = index;
            });
        });
        changes.forEachMovedItem(() => {
            items.forEach((item, index) => {
                item.order = index;
            });
        });
    }

    ngDoCheck() {
        const changes = this._diff.diff(this.items);
        if (changes) {
            this._afterChangeItems(changes, this.items);
            this._combineTransferData();
        }
        if (this._lockDiff) {
            const lockChanges = this._lockDiff.diff(this.lockItems);
            if (lockChanges) {
                this._afterChangeItems(lockChanges, this.lockItems);
            }
        }
        const unlockChanges = this._unlockDiff.diff(this.unlockItems);
        if (unlockChanges) {
            this._afterChangeItems(unlockChanges, this.unlockItems);
        }
    }

    lockListEnterPredicate = () => {
        return this.lockItems.length < this.maxLock;
    };

    drop(event: CdkDragDrop<ThyTransferItem[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            (event.previousContainer.data || []).forEach(item => {
                item.isLock = event.previousContainer.id === 'lock';
            });

            (event.container.data || []).forEach(item => {
                item.isLock = event.container.id === 'lock';
            });
        }
        const dragEvent: ThyTransferDragEvent = {
            model: event.item.data,
            models: event.container.data,
            oldIndex: event.previousIndex,
            newIndex: event.currentIndex
        };
        this.draggableUpdate.emit({
            dragEvent: dragEvent,
            listData: { lock: this.lockItems, unlock: this.unlockItems }
        });
    }
}
