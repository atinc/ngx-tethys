import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 选项卡的选项组件
 * @name thy-tab
 */
@Component({
    selector: 'thy-tab',
    template: ` <ng-template #content><ng-content></ng-content></ng-template> `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyTab implements OnInit {
    /**
     * 自定义选项标题的模板
     * @type TemplateRef
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
    @Input({ transform: coerceBooleanProperty }) thyDisabled: boolean;

    constructor() {}

    ngOnInit(): void {}
}
