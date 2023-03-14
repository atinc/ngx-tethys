import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-body',
    template: `
        <ng-content></ng-content>
    `,
    standalone: true
})
export class ThySlideBodyComponent {
    @HostBinding('class.thy-slide-body') slideLayoutBody = true;
}
