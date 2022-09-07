import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-bullet-list',
    template: `
        <thy-skeleton-bullet-list [thyWidth]="'100%'" thyHeight="1rem" thySize="1rem" thyRows="2" thySections="3" thyGutter="mr-1">
        </thy-skeleton-bullet-list>
    `
})
export class ThySkeletonExampleBulletListComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
