import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ContentChild, input } from '@angular/core';
import { coerceBooleanProperty, ThyBooleanInput } from 'ngx-tethys/util';

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
    readonly thyTitle = input<string>(undefined);

    /**
     * 选项的唯一标识
     */
    readonly id = input<string>(undefined);

    /**
     * 是否禁用选项
     * @default false
     */
    readonly thyDisabled = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    constructor() {}

    ngOnInit(): void {}
}
