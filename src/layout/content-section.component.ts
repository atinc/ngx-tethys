import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-content-section',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyContentSectionComponent {
    @HostBinding('class.thy-layout-content-section') thyLayoutContentSectionClass = true;
}
