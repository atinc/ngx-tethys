import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/**
 * @name thy-tags
 */
@Component({
    selector: 'thy-tags',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-tags'
    },
    standalone: true
})
export class ThyTagsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
