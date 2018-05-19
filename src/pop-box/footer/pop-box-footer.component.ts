import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../../util/helpers';

@Component({
    selector: 'thy-pop-box-footer',
    template: '<ng-content></ng-content>'
})
export class ThyPopBoxFooter {

    @HostBinding('class.pop-box-footer') isPopBoxFooter = true;

    @HostBinding('class.no-padding-top') _hasNoPaddingTop = true;

    @Input()
    set thyNoPaddingTop(value: boolean) {
        this._hasNoPaddingTop = inputValueToBoolean(value);
    }
}
