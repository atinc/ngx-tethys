import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-bullet-list',
    template: `
        <thy-skeleton-bullet-list
            [thyWidth]="'100%'"
            thyHeight="1rem"
            thySize="1rem"
            thyCircleClass="mr-1"
            thyRectangleClass="ml-1"
            thyRows="2"
            thySections="3"
        >
        </thy-skeleton-bullet-list>
    `
})
export class ThySkeletonExampleBulletListComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
