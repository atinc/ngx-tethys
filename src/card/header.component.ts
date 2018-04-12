import { Component, HostBinding, Input, OnInit, TemplateRef, Optional, ViewChild, ContentChild, ViewContainerRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
@Component({
    selector: 'thy-card-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html'
})
export class ThyCardHeaderComponent implements OnInit {

    public iconClass: string;

    @HostBinding('class.thy-card-header') thyLayoutHeaderClass = true;

    @HostBinding('class.header-has-border') _thyHasBorder = false;

    @HostBinding('class.thy-layout-header-sm') _thySizeSm = false;



    @Input('thyTitle') thyTitle: string;

    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = (value === 'sm');
    }

    @Input('thyHasBorder')
    set thyHasBorder(value: string) {
        this._thyHasBorder = inputValueToBoolean(value);
    }

    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {
    }

    ngOnInit() {
    }
}
