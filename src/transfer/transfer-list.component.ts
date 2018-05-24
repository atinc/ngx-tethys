import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    TemplateRef,
    IterableDiffer,
    IterableDiffers,
    OnInit,
    OnDestroy,
    DoCheck
} from '@angular/core';
import { ThyTransferModel, ThyTransferSelectEvent, ThyTransferItem, ThyTransferDragEvent } from './transfer.interface';
import { ThyTransferComponent } from './transfer.component';
import { SortablejsOptions } from 'angular-sortablejs/dist';

@Component({
    selector: 'thy-transfer-list',
    templateUrl: './transfer-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferListComponent implements OnInit, DoCheck {

    public draggableOptions: SortablejsOptions = {
        disabled: false,
        onStart: this.onDragStart.bind(this),
        onUpdate: this.onDragUpdate.bind(this)
    };

    private _dragModel: ThyTransferItem;

    private _diff: IterableDiffer<ThyTransferItem>;

    @Input() title: string;

    @Input() items: ThyTransferItem[];

    @Input()
    set draggable(value: boolean) {
        this.draggableOptions.disabled = !value;
    }

    @Input() template: TemplateRef<any>;

    @Output() draggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    @Output() select: EventEmitter<ThyTransferSelectEvent> = new EventEmitter<ThyTransferSelectEvent>();

    @HostBinding('class') hostClass = 'thy-transfer-list';

    constructor(
        private root: ThyTransferComponent,
        private differs: IterableDiffers
    ) {

    }

    ngOnInit() {
        this._diff = this.differs.find(this.items).create();
    }

    ngDoCheck() {
        const changes = this._diff.diff(this.items);
        if (changes) {
            // 数据发生变化时，更改order值
            changes.forEachAddedItem((record) => {
                record.item.order = record.currentIndex;
            });
            changes.forEachRemovedItem(() => {
                this.items.forEach((item, index) => {
                    item.order = index;
                });
            });
        }
    }

    onSelect(item: any) {
        const event: ThyTransferSelectEvent = { item: item };
        this.select.emit(event);
    }

    onDragStart(event: any) {
        this._dragModel = this.items[event.oldIndex];
    }

    onDragUpdate(event: any) {
        const dragEvent: ThyTransferDragEvent = {
            model: this._dragModel,
            models: this.items,
            oldIndex: event.oldIndex,
            newIndex: event.newIndex,
        };
        this.draggableUpdate.emit(dragEvent);
    }
}
