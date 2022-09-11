import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyPopover } from '../popover.service';

/**
 * 悬浮层头部组件
 * @name thy-popover-header
 */
@Component({
    selector: 'thy-popover-header',
    templateUrl: './popover-header.component.html',
    exportAs: 'thyPopoverHeader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-popover-header'
    }
})
export class ThyPopoverHeaderComponent {
    /**
     * 头部标题
     */
    @Input() thyTitle: string;

    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    /**
     * @internal
     */
    @Output() thyClosed: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private translate: ThyTranslate, private thyPopover: ThyPopover) {}

    /**
     * @internal
     */
    close(event: Event) {
        this.thyClosed.emit(event);
        this.thyPopover.close();
    }
}
