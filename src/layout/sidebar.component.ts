import { Component, HostBinding, Host, Optional, OnInit } from '@angular/core';
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

    constructor( @Optional() @Host() private thyLayoutComponent: ThyLayoutComponent) {

    }

    ngOnInit() {
        if (this.thyLayoutComponent) {
            this.thyLayoutComponent.hasSidebar = true;
        }
    }
}
