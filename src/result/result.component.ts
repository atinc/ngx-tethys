import { Component, ContentChild, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

type ThyResultStatus = 'success' | 'warning' | 'error';

/**
 * 结果页组件
 * @name thy-result
 */
@Component({
    selector: 'thy-result',
    templateUrl: './result.component.html',
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class ThyResult implements OnInit {
    /**
     * @description 结果的状态，决定显示的图标
     * @type success | warning | error
     */
    @Input() thyStatus: ThyResultStatus;

    /**
     * @description 自定义 icon，作为 img 的 src 显示
     * @type string
     */
    @Input() thyIcon: string;

    /**
     * @description 标题
     * @type string
     */
    @Input() thyTitle: string;

    /**
     * @description 二级标题
     * @type string
     */
    @Input() thySubtitle: string;

    /**
     * @description 自定义 icon 模板
     * @type TemplateRef<any>
     */
    @ContentChild('thyIcon') iconTemplateRef: TemplateRef<any>;

    /**
     * @description 自定义标题模板
     * @type TemplateRef<any>
     */
    @ContentChild('thyTitle') titleTemplateRef: TemplateRef<any>;

    /**
     * @description 自定义二级标题模板
     * @type TemplateRef<any>
     */
    @ContentChild('thySubtitle') subtitleTemplateRef: TemplateRef<any>;

    /**
     * @description 自定义操作区域
     * @type TemplateRef<any>
     */
    @ContentChild('thyExtra') extraTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-result') className = true;

    constructor() {}

    ngOnInit() {}
}
