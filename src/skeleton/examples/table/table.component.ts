import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-table-list',
    template: `
        <thy-skeleton-table
            [thyRowHeight]="model.thyRowHeight"
            [thyCols]="model.thyCols"
            [thyRowCount]="model.thyRowCount"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
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
        thyRowCount: 5,
        thyRowHeight: '18px',
        thyCols: [100, 200, 200, '300px'],
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#aaaaaa',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
