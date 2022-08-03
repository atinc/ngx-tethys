import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef, ContentChild } from '@angular/core';

/**
 * thy-tab
 */
@Component({
    selector: 'thy-tab',
    template: `
        <ng-template #content><ng-content></ng-content></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyTabComponent implements OnInit {
    @ContentChild('title') titleTemplateRef: TemplateRef<unknown>;

    @ViewChild('content', { static: true }) content: TemplateRef<HTMLElement>;

    /**
     * 选项标题
     */
    @Input() thyTitle: string;

    /**
     * 选项的唯一标识
     */
    @Input() set thyId(id: string) {
        this.id = id;
    }

    public id: string;

    constructor() {}

    ngOnInit(): void {}
}
