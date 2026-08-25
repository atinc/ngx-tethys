import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

/**
 * @name thy-slide-body
 * @order 45
 */
@Component({
    selector: 'thy-slide-body',
    changeDetection: ChangeDetectionStrategy.Eager,
    template: ` <ng-content></ng-content> `
})
export class ThySlideBody {
    @HostBinding('class.thy-slide-body') slideLayoutBody = true;
}
