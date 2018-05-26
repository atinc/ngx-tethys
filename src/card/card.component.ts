import { Component, HostBinding, Input } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-card',
    template: `
    <ng-content></ng-content>
  `
})
export class ThyCardComponent {

    @HostBinding('class.thy-card') thyCardClass = true;

    @HostBinding('class.thy-card--clear-left-right-padding') clearLeftRightPadding = false;

    @HostBinding('class.thy-card--scroll') scrollClassName = false;

    @Input('thyHasLeftRightPadding')
    set thyHasLeftRightPadding(value: any) {
        this.clearLeftRightPadding = !inputValueToBoolean(value);
    }

    @Input('thyContentScroll')
    set thyContentScroll(value: any) {
        this.scrollClassName = !inputValueToBoolean(value);
    }

}
