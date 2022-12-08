import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-table-skeleton-example',
    template: `
        <thy-table-skeleton
            [thyRowHeight]="model.thyRowHeight"
            [thyRowCount]="model.thyRowCount"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated"
            [thyBorderRadius]="model.thyBorderRadius"
        >
        </thy-table-skeleton>
    `
})
export class ThyTableSkeletonExampleComponent implements OnInit {
    model = {
        thyBorderRadius: 2,
        thyRowCount: 6,
        thyRowHeight: '18px',
        thyAnimatedInterval: 1.2,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
