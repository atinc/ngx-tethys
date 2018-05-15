import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { ThyTransferModel, ThyTransferSelectEvent, ThyTransferItem, ThyTransferDragEvent } from './transfer.interface';
import { ThyTransferComponent } from './transfer.component';
import { SortablejsOptions } from 'angular-sortablejs/dist';

@Component({
    selector: 'thy-transfer-list',
    templateUrl: './transfer-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferListComponent {

    @HostBinding('class') hostClass = 'thy-transfer-list';

    @Input() title: string;

    @Input() items: ThyTransferItem[];

    @Input()
    set draggable(value: boolean) {
        this.draggableOptions.disabled = !value;
    }

    @Input() template: TemplateRef<any>;

    @Output() draggableUpdate: EventEmitter<ThyTransferDragEvent> = new EventEmitter<ThyTransferDragEvent>();

    @Output() select: EventEmitter<ThyTransferSelectEvent> = new EventEmitter<ThyTransferSelectEvent>();

    public draggableOptions: SortablejsOptions = {
        disabled: false,
        onStart: this.onDragStart.bind(this),
        onUpdate: this.onDragUpdate.bind(this)
    };

    private _dragModel: ThyTransferItem;

    constructor(
        private root: ThyTransferComponent
    ) {

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
