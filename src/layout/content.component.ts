import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyContentComponent {
    @HostBinding('class.thy-layout-content') thyLayoutContentClass = true;
    @HostBinding('class.thy-layout-content--align-center') alignTitleClassName = false;
    @Input()
    set thyAlignment(value: string) {
        if (value === 'title') {
            this.alignTitleClassName = true;
        }
    }
}
