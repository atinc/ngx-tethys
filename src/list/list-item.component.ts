import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>'
})
export class ThyListItemComponent {
    @HostBinding(`class.thy-list-item`) _isListItem = true;

    constructor() {}
}
