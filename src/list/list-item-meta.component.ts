import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { coerceBooleanProperty } from '../util/helpers';

@Component({
    selector: 'thy-list-item-meta,[thy-list-item-meta]',
    templateUrl: './list-item-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyListItemMetaComponent {
    @Input() thyAvatar: string;

    @Input() thyTitle: string;

    @Input() thyDescription: string;

    @ContentChild('metaAvatar', { static: false })
    public avatarTemplateRef: TemplateRef<any>;

    @ContentChild('metaTitle', { static: false })
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('metaDescription', { static: false })
    public descriptionTemplateRef: TemplateRef<any>;

    @HostBinding('class') className = `thy-list-item-meta`;

    constructor() {}
}
