import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util/helpers';

@Component({
    selector: 'thy-pop-box-footer',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyPopBoxFooter {
    @HostBinding('class.pop-box-footer') isPopBoxFooter = true;

    @HostBinding('class.no-padding-top') _hasNoPaddingTop = true;

    @Input()
    set thyNoPaddingTop(value: boolean) {
        this._hasNoPaddingTop = coerceBooleanProperty(value);
    }
}
