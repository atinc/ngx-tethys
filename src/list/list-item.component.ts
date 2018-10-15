import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-list-item',
    template: '<ng-content></ng-content>'
})
export class ThyListItemComponent {

    @HostBinding(`class.thy-list-item`) _isListItem = true;

    constructor() { }
}
