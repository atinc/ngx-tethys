import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { ThyTransferModel, ThyTransferSelectEvent, ThyTransferItem } from './transfer.interface';
import { ThyTransferComponent } from './transfer.component';

@Component({
    selector: 'thy-transfer-list',
    templateUrl: './transfer-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferListComponent {

    @HostBinding('class') hostClass = 'thy-transfer-list';

    @Input() title: string;

    @Input() items: ThyTransferItem[];

    @Input() template: TemplateRef<any>;

    @Output() select: EventEmitter<ThyTransferSelectEvent> = new EventEmitter<ThyTransferSelectEvent>();

    constructor(
        private root: ThyTransferComponent
    ) {

    }

    onSelect(item: any) {
        const event: ThyTransferSelectEvent = { item: item };
        this.select.emit(event);
    }
}
