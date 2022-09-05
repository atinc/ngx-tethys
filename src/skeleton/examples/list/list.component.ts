import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-list',
    template: `
        <thy-skeleton-list thyRows="3" thySections="2" thyBorderRadius="5px" thyWidth="80%"> </thy-skeleton-list>
    `
})
export class ThySkeletonExampleListComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
