import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyPopover } from '../popover.service';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

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
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, ThyIconComponent]
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
     * 自定义头部模版
     */
    @ContentChild('popoverHeader')
    public headerTemplate: TemplateRef<any>;

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
