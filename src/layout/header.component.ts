import { Component, HostBinding, Input, OnInit, TemplateRef, Optional, ViewChild, ContentChild, ViewContainerRef } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html'
})
export class ThyHeaderComponent implements OnInit {
    public iconClass: string;

    public svgIconName: string;

    @HostBinding('class.thy-layout-header') thyLayoutHeaderClass = true;

    @HostBinding('class.thy-layout-header-divided') divided = false;

    @HostBinding('class.thy-layout-header-sm') _thySizeSm = false;

    /**
     * 底部是否有分割线
     * @deprecated please use thyDivided
     */
    @Input('thyHasBorder')
    set thyHasBorder(value: string) {
        this.divided = coerceBooleanProperty(value);
    }

    /**
     * 底部是否有分割线
     */
    @Input()
    @InputBoolean()
    set thyDivided(value: string | boolean) {
        this.divided = value as boolean;
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

    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('headerContent')
    public contentTemplateRef: TemplateRef<any>;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
function BooleanInput() {
    throw new Error('Function not implemented.');
}
