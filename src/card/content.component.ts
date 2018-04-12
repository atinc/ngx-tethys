import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyCardContentComponent {
    @HostBinding('class.thy-card-content') thyCardContentClass = true;
}
