import { Component, HostBinding } from '@angular/core';

/**
 * @name thy-list-item,[thy-list-item]
 * @order 15
 */
@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>'
})
export class ThyListItem {
    @HostBinding(`class.thy-list-item`) _isListItem = true;

    constructor() {}
}
