import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-rectangle-example',
    template: `
        <thy-skeleton-rectangle
            [thyAnimated]="model.thyAnimated"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyBorderRadius]="model.thyBorderRadius"
        >
        </thy-skeleton-rectangle>
    `
})
export class ThySkeletonExampleRectangleComponent implements OnInit {
    model = {
        thyBorderRadius: 6,
        thyRowWidth: '100%',
        thyRowHeight: 20,
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#eeeeee',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    constructor() {}
    ngOnInit() {}
}
