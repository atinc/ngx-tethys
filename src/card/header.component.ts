import { Component, HostBinding, Input, OnInit, TemplateRef, Optional, ViewChild, ContentChild, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'thy-card-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html'
})
export class ThyCardHeaderComponent implements OnInit {
    public iconClass: string;

    @HostBinding('class.thy-card-header') thyLayoutHeaderClass = true;

    @HostBinding('class.thy-card-header--sm') _thySizeSm = false;

    @HostBinding('class.thy-card-header--lg') _thySizeLg = false;

    @Input('thyTitle') thyTitle: string;

    @Input('thyDescription') thyDescription: string;

    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = value === 'sm';
        this._thySizeLg = value === 'lg';
    }

    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('headerDescription')
    public descriptionTemplateRef: TemplateRef<any>;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
