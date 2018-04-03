import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-header',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyHeaderComponent {
    @HostBinding('class.thy-layout-header') thyLayoutHeaderClass = true;
}
