import { Component, Input, HostBinding, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-list-item-meta,[thy-list-item-meta]',
    templateUrl: './list-item-meta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyListItemMetaComponent {
    @Input() thyAvatar: string;

    @Input() thyTitle: string;

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
