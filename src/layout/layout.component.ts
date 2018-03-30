import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-layout',
    template: `
    <ng-content></ng-content>
  `
})
export class ThyLayoutComponent {

    @HostBinding('class.thy-layout') thyLayoutClass = true;

    @HostBinding('class.thy-layout--has-sidebar') hasSidebar = false;
}
