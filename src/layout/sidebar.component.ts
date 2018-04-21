import { Component, HostBinding, Host, Optional, OnInit, Input } from '@angular/core';
import { ThyLayoutComponent } from './layout.component';
@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThySidebarComponent implements OnInit {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;

    @HostBinding('style.width.px') thyLayoutSidebarWidth: number;

    @Input('thyWidth')
    set thyWidth(value: any) {
        this.thyLayoutSidebarWidth = value;
    }

    constructor(@Optional() @Host() private thyLayoutComponent: ThyLayoutComponent) {

    }

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
    }
}
