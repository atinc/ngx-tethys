import { Component, HostBinding } from '@angular/core';

/**
 * @private
 */
@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>',
    standalone: true
})
export class ThyListItemComponent {
    @HostBinding(`class.thy-list-item`) _isListItem = true;

    constructor() {}
}
