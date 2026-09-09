import { Component, OnInit } from '@angular/core';

/**
 * @name thy-tags
 */
@Component({
    selector: 'thy-tags',
    template: '<ng-content></ng-content>',
    host: {
        class: 'thy-tags'
    }
})
export class ThyTags implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
