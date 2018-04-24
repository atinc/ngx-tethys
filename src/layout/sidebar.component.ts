import { Component, HostBinding, Host, Optional, OnInit, Input } from '@angular/core';
import { ThyLayoutComponent } from './layout.component';
import { inputValueToBoolean } from '../util/helpers';
@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThySidebarComponent implements OnInit {

    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('class.thy-layout-sidebar--clear-border-right') thyLayoutSidebarClearBorderRightClass = false;

    @HostBinding('style.width.px') thyLayoutSidebarWidth: number;

    @Input('thyWidth')
    set thyWidth(value: any) {
        this.thyLayoutSidebarWidth = value;
    }

    @Input('thyHasBorderRight')
    set thyHasBorderRight(value: string) {
        this.thyLayoutSidebarClearBorderRightClass = !inputValueToBoolean(value);
    }

    constructor(@Optional() @Host() private thyLayoutComponent: ThyLayoutComponent) {

    }

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
    }
}
