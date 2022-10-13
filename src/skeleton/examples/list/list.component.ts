import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-list',
    template: `
        <thy-skeleton-list
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyBorderRadius]="model.thyBorderRadius"
            [thyRowsCount]="model.thyRowsCount"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated"
        >
        </thy-skeleton-list>
    `
})
export class ThySkeletonExampleListComponent implements OnInit {
    model = {
        thyRowWidth: '90%',
        thyRowHeight: 20,
        thyBorderRadius: 6,
        thyRowsCount: 3,
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#eeeeee',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    constructor() {}
    ngOnInit() {}
}
