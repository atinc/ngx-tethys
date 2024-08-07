import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'thy-skeleton-rectangle-example',
    template: `
        <thy-skeleton-rectangle
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyBorderRadius]="model.thyBorderRadius"
            [thyAnimated]="model.thyAnimated">
        </thy-skeleton-rectangle>
    `
})
export class ThySkeletonExampleRectangleComponent implements OnInit {
    model = {
        thyBorderRadius: 4,
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyPrimaryColor: 'var(--color-20)',
        thySecondaryColor: 'var(--color-70)',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
