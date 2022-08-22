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
    /**
     * 自定义选项标题的模板
     */
    @ContentChild('title') titleTemplateRef: TemplateRef<unknown>;

    @ViewChild('content', { static: true }) content: TemplateRef<HTMLElement>;

    /**
     * 选项标题
     */
    @Input() thyTitle: string;

    /**
     * 选项的唯一标识
     */
    @Input() id: string;

    /**
     * 是否禁用选项
     * @default false
     */
    @Input() thyDisabled: boolean;

    constructor() {}

    ngOnInit(): void {}
}
