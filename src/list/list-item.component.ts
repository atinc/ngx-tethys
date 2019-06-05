import { Component, Input, HostBinding } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>'
})
export class ThyListItemComponent {
    @HostBinding(`class.thy-list-item`) _isListItem = true;

    @HostBinding('class.thy-list-item-border-bottom') isShowUnderline = false;

    @Input()
    set thyIsShowUnderline(value: boolean) {
        this.isShowUnderline = value || this.isShowUnderline;
    }

    constructor() {}
}
