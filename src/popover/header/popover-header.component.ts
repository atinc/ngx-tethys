import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyPopover } from '../popover.service';

@Component({
    selector: 'thy-popover-header',
    templateUrl: './popover-header.component.html',
    exportAs: 'thyPopoverHeader'
})
export class ThyPopoverHeaderComponent {
    @Input() thyTitle: string;

    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    @Output() thyClosed: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private translate: ThyTranslate, private thyPopover: ThyPopover) {}

    close(event: Event) {
        this.thyClosed.emit(event);
        this.thyPopover.close();
    }
}
