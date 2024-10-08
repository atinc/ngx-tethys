import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

/**
 * @name thy-list-item-meta,[thy-list-item-meta]
 * @order 40
 */
@Component({
    selector: 'thy-list-item-meta,[thy-list-item-meta]',
    templateUrl: './list-item-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ThyAvatar, NgTemplateOutlet]
})
export class ThyListItemMeta {
    /**
     * 列表项的左侧图片
     */
    @Input() thyAvatar: string;

    /**
     * 列表项的标题
     */
    @Input() thyTitle: string;

    /**
     * 列表项的描述文本
     */
    @Input() thyDescription: string;

    @ContentChild('metaAvatar')
    public avatarTemplateRef: TemplateRef<any>;

    @ContentChild('metaTitle')
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('metaDescription')
    public descriptionTemplateRef: TemplateRef<any>;

    @HostBinding('class') className = `thy-list-item-meta`;

    constructor() {}
}
