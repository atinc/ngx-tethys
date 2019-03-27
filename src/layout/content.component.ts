import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyContentComponent {
    @HostBinding('class.thy-layout-content') _isLayoutContent = true;
}
