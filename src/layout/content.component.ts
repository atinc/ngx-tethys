import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyContentComponent {
    @HostBinding('class.thy-layout-content') thyLayoutContentClass = true;
}
