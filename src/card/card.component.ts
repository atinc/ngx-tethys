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

    @Input('thyHasLeftRightPadding')
    set thyHasLeftRightPadding(value: any) {
        this.clearLeftRightPadding = !inputValueToBoolean(value);
    }

}
