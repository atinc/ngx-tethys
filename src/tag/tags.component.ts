import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-tags',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-tags'
    }
})
export class ThyTagsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
