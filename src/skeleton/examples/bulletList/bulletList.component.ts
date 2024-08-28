import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-bullet-list',
    template: `
        <thy-skeleton-bullet-list
            [thySize]="model.thySize"
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyBorderRadius]="model.thyBorderRadius"
            [thyRowCount]="model.thyRowCount"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated">
        </thy-skeleton-bullet-list>
    `
})
export class ThySkeletonExampleBulletListComponent implements OnInit {
    model = {
        thySize: 20,
        thyRowWidth: '90%',
        thyRowHeight: '20px',
        thyBorderRadius: 4,
        thyRowCount: 3,
        thyPrimaryColor: 'var(--gray-70)',
        thySecondaryColor: 'var(--gray-500)',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
