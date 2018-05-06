import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation,
    HostBinding,
    EventEmitter,
    ContentChild,
    TemplateRef
} from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';

import { ThyTransferItem, ThyTransferChangeEvent, ThyTransferSelectEvent } from './transfer.interface';

@Component({
    selector: 'thy-transfer',
    templateUrl: './transfer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTransferComponent {

    @HostBinding('class') hostClass = 'thy-transfer';

    public sourceItems: ThyTransferItem[];

    public targetItems: ThyTransferItem[];

    public leftTitle: string;

    public rightTitle: string;

    private _canMove: Function;

    private _autoMove = true;

    @Input()
    set thyData(value: ThyTransferItem[]) {
        if (value) {
            this.sourceItems = value.filter((item) => item.direction === 'left');
            this.targetItems = value.filter((item) => item.direction === 'right');
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

    @Output() thyChange: EventEmitter<ThyTransferChangeEvent> = new EventEmitter<ThyTransferChangeEvent>();

    @ContentChild('renderTemplate') templateRef: TemplateRef<any>;

    onSelect(direction: 'left' | 'right', event: ThyTransferSelectEvent) {
        const to = direction === 'left' ? 'right' : 'left';
        event.item.checked = !event.item.checked;
        if (this._autoMove) {
            this.onMove(to);
        }
    }

    onMove(to: 'left' | 'right') {
        const from = to === 'right' ? 'left' : 'right';
        const sourceItems = (to === 'right') ? this.sourceItems : this.targetItems;
        const targetItems = (to === 'right') ? this.targetItems : this.sourceItems;
        const selections = sourceItems.filter(item => item.checked);
        const changeEvent: ThyTransferChangeEvent = {
            from: from,
            to: to,
            items: [...selections]
        };
        selections.forEach(item => {
            const index = sourceItems.indexOf(item);
            const removed = sourceItems.splice(index, 1)[0];
            removed.checked = !removed.checked;
            removed.direction = to;
            targetItems.push(removed);
        });
        this.thyChange.emit(changeEvent);
    }
}
