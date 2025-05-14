import { ChangeDetectionStrategy, Component, ContentChild, computed, TemplateRef, inject, input, output } from '@angular/core';
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
    readonly thyTitle = input<string>(undefined);

    /**
     * 标题的多语言 Key
     */
    readonly thyTitleTranslationKey = input<string>(undefined);

    protected readonly titleSignal = computed(() => {
        const title = this.thyTitle();
        if (title) {
            return title;
        }
        const titleTranslationKey = this.thyTitleTranslationKey();
        if (titleTranslationKey) {
            return this.translate.instant(titleTranslationKey);
        }
        return '';
    });

    /**
     * 自定义头部模板
     * @type TemplateRef
     */
    @ContentChild('popoverHeader')
    public headerTemplate: TemplateRef<any>;

    /**
     * @internal
     */
    readonly thyClosed = output<Event>();

    /**
     * @internal
     */
    close(event: Event) {
        this.thyClosed.emit(event);
        this.thyPopover.close();
    }
}
