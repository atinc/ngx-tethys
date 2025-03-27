import { Component, Input, OnInit, TemplateRef, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

/**
 * 卡片头部组件
 * @name thy-card-header
 * @order 20
 */
@Component({
    selector: 'thy-card-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card-header',
        '[class.thy-card-header--sm]': 'thySize === "sm"',
        '[class.thy-card-header--lg]': 'thySize === "lg"',
        '[class.thy-card-header--md]': 'thySize === "md"'
    },
    imports: [NgTemplateOutlet]
})
export class ThyCardHeader implements OnInit {
    public iconClass: string;

    /**
     * 头部，标题
     */
    @Input('thyTitle') thyTitle: string;

    /**
     * 头部，附加信息
     */
    @Input('thyDescription') thyDescription: string;

    /**
     * 已废弃，头部大小
     * @deprecated
     * @default md
     */
    @Input('thySize') thySize: 'sm' | 'lg' | 'md' | '';

    /**
     * 自定义头部标题
     * @type TemplateRef
     */
    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    /**
     * 自定义头部描述
     * @type TemplateRef
     */
    @ContentChild('headerDescription')
    public descriptionTemplateRef: TemplateRef<any>;

    /**
     * 自定义头部操作区域
     * @type TemplateRef
     */
    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
