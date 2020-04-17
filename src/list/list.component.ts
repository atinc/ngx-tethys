import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { InputBoolean } from '../core';

@Component({
    selector: 'thy-list',
    template: '<ng-content></ng-content>'
})
export class ThyListComponent {
    @Input()
    @InputBoolean()
    set thySplit(value: boolean) {
        this._isSplit = value;
    }

    @HostBinding(`class.thy-list-split`) _isSplit = false;

    @HostBinding(`class.thy-list`) _isList = true;

    constructor() {}
}
