import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-content-main',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyContentMainComponent {
    @HostBinding('class.thy-layout-content-main') thyLayoutContentClass = true;
}
