import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-circle-example',
    template: `
        <thy-skeleton-circle
            [thyAnimated]="model.thyAnimated"
            [thySize]="model.thySize"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor">
        </thy-skeleton-circle>
    `
})
export class ThySkeletonExampleCircleComponent implements OnInit {
    model = {
        thySize: 32,
        thyPrimaryColor: 'var(--gray-70)',
        thySecondaryColor: 'var(--gray-500)',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
