import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-list',
    template: `
        <thy-skeleton-list
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyBorderRadius]="model.thyBorderRadius"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated"
            [thyRowCount]="model.thyRowCount">
        </thy-skeleton-list>
    `
})
export class ThySkeletonExampleListComponent implements OnInit {
    model = {
        thyRowWidth: '90%',
        thyRowHeight: '20px',
        thyBorderRadius: 4,
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#aaaaaa',
        thyAnimatedInterval: 1.5,
        thyAnimated: true,
        thyRowCount: 3
    };
    constructor() {}

    ngOnInit() {}
}
