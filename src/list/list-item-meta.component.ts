import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, input, contentChild } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';

/**
 * @name thy-list-item-meta,[thy-list-item-meta]
 * @order 40
 */
@Component({
    selector: 'thy-list-item-meta,[thy-list-item-meta]',
    templateUrl: './list-item-meta.component.html',
    host: {
        class: 'thy-list-item-meta'
    },
    imports: [ThyAvatar, NgTemplateOutlet]
})
export class ThyListItemMeta {
    /**
     * 列表项的左侧图片
     */
    readonly thyAvatar = input<string>();

    /**
     * 列表项的标题
     */
    readonly thyTitle = input<string>();

    /**
     * 列表项的描述文本
     */
    readonly thyDescription = input<string>();

    readonly avatarTemplateRef = contentChild<TemplateRef<any>>('metaAvatar');

    readonly titleTemplateRef = contentChild<TemplateRef<any>>('metaTitle');

    readonly descriptionTemplateRef = contentChild<TemplateRef<any>>('metaDescription');
}
