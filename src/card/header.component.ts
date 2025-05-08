import { Component, OnInit, TemplateRef, ChangeDetectionStrategy, input, contentChild } from '@angular/core';
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
        '[class.thy-card-header--sm]': 'thySize() === "sm"',
        '[class.thy-card-header--lg]': 'thySize() === "lg"',
        '[class.thy-card-header--md]': 'thySize() === "md"'
    },
    imports: [NgTemplateOutlet]
})
export class ThyCardHeader implements OnInit {
    public iconClass: string;

    /**
     * 头部，标题
     */
    readonly thyTitle = input<string>();

    /**
     * 头部，附加信息
     */
    readonly thyDescription = input<string>();

    /**
     * 已废弃，头部大小
     * @deprecated
     */
    readonly thySize = input<'sm' | 'lg' | 'md' | ''>('md');

    /**
     * 自定义头部标题
     * @type TemplateRef
     */
    public readonly titleTemplateRef = contentChild<TemplateRef<any>>('headerTitle');

    /**
     * 自定义头部描述
     * @type TemplateRef
     */
    public readonly descriptionTemplateRef = contentChild<TemplateRef<any>>('headerDescription');

    /**
     * 自定义头部操作区域
     * @type TemplateRef
     */
    public readonly operationTemplateRef = contentChild<TemplateRef<any>>('headerOperation');

    constructor() {}

    ngOnInit() {}
}
