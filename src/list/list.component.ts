import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-list',
    template: '<ng-content></ng-content>'
})
export class ThyListComponent {

    @HostBinding(`class.thy-list`) _isList = true;

    constructor() { }
}
