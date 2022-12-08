import { Component, OnInit } from '@angular/core';
import { ThyTableTheme } from 'ngx-tethys/table';
@Component({
    selector: 'thy-skeleton-example-table',
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
export class ThySkeletonExampleTableComponent implements OnInit {
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
