import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-list',
    template: '<ng-content></ng-content>'
})
export class ThyListComponent {
    @Input('thyBordered')
    set thyBordered(value: boolean) {
        this._bordered = inputValueToBoolean(value);
    }

    @HostBinding(`class.thy-list-split`) _bordered = false;

    @HostBinding(`class.thy-list`) _isList = true;

    constructor() {}
}
