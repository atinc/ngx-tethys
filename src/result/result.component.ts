import { Component, ContentChild, HostBinding, OnInit, TemplateRef, contentChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

type ThyResultStatus = 'success' | 'warning' | 'error';

/**
 * 结果页组件
 * @name thy-result
 */
@Component({
    selector: 'thy-result',
    templateUrl: './result.component.html',
    imports: [NgTemplateOutlet],
    host: {
        class: 'thy-result'
    }
})
export class ThyResult implements OnInit {
    /**
     * @description 结果的状态，决定显示的图标
     * @type success | warning | error
     */
    readonly thyStatus = input<ThyResultStatus>(undefined);

    /**
     * @description 自定义 icon，作为 img 的 src 显示
     * @type string
     */
    readonly thyIcon = input<string>(undefined);

    /**
     * @description 标题
     * @type string
     */
    readonly thyTitle = input<string>(undefined);

    /**
     * @description 二级标题
     * @type string
     */
    readonly thySubtitle = input<string>(undefined);

    /**
     * @description 自定义 icon 模板
     * @type TemplateRef<any>
     */
    protected readonly iconTemplateRef = contentChild<TemplateRef<any>>('thyIcon');

    /**
     * @description 自定义标题模板
     * @type TemplateRef<any>
     */
    protected readonly titleTemplateRef = contentChild<TemplateRef<any>>('thyTitle');

    /**
     * @description 自定义二级标题模板
     * @type TemplateRef<any>
     */
    protected readonly subtitleTemplateRef = contentChild<TemplateRef<any>>('thySubtitle');

    /**
     * @description 自定义操作区域
     * @type TemplateRef<any>
     */
    protected readonly extraTemplateRef = contentChild<TemplateRef<any>>('extra');

    constructor() {}

    ngOnInit() {}
}
