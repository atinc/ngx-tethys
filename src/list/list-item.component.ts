import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class ThyListItemComponent {
    @HostBinding(`class.thy-list-item`) _isListItem = true;

    constructor() {}
}
