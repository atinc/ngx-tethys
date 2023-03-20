import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { ThyAvatarComponent } from 'ngx-tethys/avatar';
import { NgIf } from '@angular/common';

@Component({
    selector: 'thy-list-item-meta,[thy-list-item-meta]',
    templateUrl: './list-item-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ThyAvatarComponent]
})
export class ThyListItemMetaComponent {
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
