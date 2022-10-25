import { Component, ContentChild, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';

type ThyResultStatus = 'success' | 'warning' | 'error';

@Component({
    selector: 'thy-result',
    templateUrl: './result.component.html'
})
export class ThyResultComponent implements OnInit {
    /**
     * @description 结果的状态，决定图标和颜色
     * @type ThyResultStatus
     */
    @Input() thyStatus: ThyResultStatus;

    /**
     * @description 标题
     * @type TemplateRef<any> ｜ string
     */
    @Input() thyTitle: string;

    /**
     * @description 二级标题
     * @type TemplateRef<any> ｜ string
     */
    @Input() thySubtitle: string;

    /**
     * @description 自定义 icon
     * @type TemplateRef<any> ｜ string
     */
    @Input() thyIcon: string;

    /**
     * @internal
     */
    @ContentChild('thyIcon') iconTemplateRef: TemplateRef<any>;

    /**
     * @description 自定义操作区域
     * @type TemplateRef<void>
     */
    @ContentChild('thyExtra') extraTemplateRef: TemplateRef<any>;

    /**
     * @internal
     */
    @ContentChild('thyTitle') titleTemplateRef: TemplateRef<any>;

    /**
     * @internal
     */
    @ContentChild('thySubtitle') subtitleTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-result') className = true;

    constructor() {}

    ngOnInit() {}
}
