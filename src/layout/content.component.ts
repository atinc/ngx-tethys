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
    @HostBinding('class.thy-layout-content--align-center') AlignTitleClassName = false;
    @Input()
    set thyAlignment(value) {
        if (value === 'title') {
            this.AlignTitleClassName = true;
        }
    }
}
