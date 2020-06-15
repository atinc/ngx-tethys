import { Component, HostBinding, Input, OnInit, TemplateRef, Optional, ViewChild, ContentChild, ViewContainerRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html'
})
export class ThyHeaderComponent implements OnInit {
    public iconClass: string;

    public svgIconName: string;

    @HostBinding('class.thy-layout-header') thyLayoutHeaderClass = true;

    @HostBinding('class.header-has-border') _thyHasBorder = false;

    @HostBinding('class.thy-layout-header-sm') _thySizeSm = false;

    @Input('thyHasBorder')
    set thyHasBorder(value: string) {
        this._thyHasBorder = inputValueToBoolean(value);
    }

    @Input('thySize')
    set thySize(value: string) {
        this._thySizeSm = value === 'sm';
    }

    @Input() thyTitle: string;

    @Input() thyIconPrefix = 'wtf';

    @Input('thyIcon')
    set thyIcon(value: string) {
        if (value) {
            if (value.includes('wtf')) {
                this.iconClass = `${this.thyIconPrefix} ${value}`;
            } else {
                this.svgIconName = value;
            }
        } else {
            this.iconClass = null;
            this.svgIconName = null;
        }
    }

    @ContentChild('headerTitle', { static: false })
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('headerContent', { static: false })
    public contentTemplateRef: TemplateRef<any>;

    @ContentChild('headerOperation', { static: false })
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
