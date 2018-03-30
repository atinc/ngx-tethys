import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-sidebar',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThySidebarComponent {
    @HostBinding('class.thy-layout-sidebar') thyLayoutSidebarClass = true;
}
