import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-paragraph',
    template: `
        <thy-skeleton-paragraph
            [thyRowCount]="model.thyRowCount"
            [thyFirstWidth]="model.thyFirstWidth"
            [thyLastWidth]="model.thyLastWidth"
            [thyRowWidth]="model.thyRowWidth"
            [thyRowHeight]="model.thyRowHeight"
            [thyBorderRadius]="model.thyBorderRadius"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
            [thyAnimatedInterval]="model.thyAnimatedInterval"
            [thyAnimated]="model.thyAnimated">
        </thy-skeleton-paragraph>
    `
})
export class ThySkeletonExampleParagraphComponent implements OnInit {
    model = {
        thyRowCount: 4,
        thyFirstWidth: '33%',
        thyLastWidth: '66%',
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: '4px',
        thyPrimaryColor: 'var(--color-20)',
        thySecondaryColor: 'var(--color-70)',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
