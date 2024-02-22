import { Component, HostBinding } from '@angular/core';

/**
 * @name thy-slide-body
 * @order 45
 */
@Component({
    selector: 'thy-slide-body',
    template: ` <ng-content></ng-content> `,
    standalone: true
})
export class ThySlideBody {
    @HostBinding('class.thy-slide-body') slideLayoutBody = true;
}
