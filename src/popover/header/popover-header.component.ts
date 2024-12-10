import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyPopover } from '../popover.service';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

/**
 * 悬浮层头部组件
 * @name thy-popover-header
 * @order 30
 */
@Component({
    selector: 'thy-popover-header',
    templateUrl: './popover-header.component.html',
    exportAs: 'thyPopoverHeader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-popover-header'
    },
    imports: [NgTemplateOutlet, ThyIcon]
})
export class ThyPopoverHeader {
    private translate = inject(ThyTranslate);
    private thyPopover = inject(ThyPopover);

    /**
     * 头部标题
     */
    @Input() thyTitle: string;

    /**
     * 标题的多语言 Key
     */
    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    /**
     * 自定义头部模板
     * @type TemplateRef
     */
    @ContentChild('popoverHeader')
    public headerTemplate: TemplateRef<any>;

    /**
     * @internal
     */
    @Output() thyClosed: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * @internal
     */
    close(event: Event) {
        this.thyClosed.emit(event);
        this.thyPopover.close();
    }
}
