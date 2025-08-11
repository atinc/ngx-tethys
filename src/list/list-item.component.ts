import { Component } from '@angular/core';

/**
 * @name thy-list-item,[thy-list-item]
 * @order 15
 */
@Component({
    selector: 'thy-list-item,[thy-list-item]',
    template: '<ng-content></ng-content>',
    host: {
        class: 'thy-list-item'
    }
})
export class ThyListItem {}
