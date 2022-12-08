import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'thy-table-skeleton-example',
    template: `
        <thy-skeleton-table
            [thyRowHeight]="model.thyRowHeight"
            [thyRowCount]="model.thyRowCount"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated"
            [thyBorderRadius]="model.thyBorderRadius"
        >
        </thy-skeleton-table>
    `
})
export class ThyTableSkeletonExampleComponent implements OnInit {
    model = {
        thyBorderRadius: 2,
        thyRowCount: 6,
        thyRowHeight: '18px',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
