import { Component, OnInit } from '@angular/core';
import { ThySkeletonParagraph } from 'ngx-tethys/skeleton';

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
    `,
    imports: [ThySkeletonParagraph]
})
export class ThySkeletonExampleParagraphComponent implements OnInit {
    model = {
        thyRowCount: 4,
        thyFirstWidth: '33%',
        thyLastWidth: '66%',
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: '4px',
        thyPrimaryColor: 'var(--gray-70)',
        thySecondaryColor: 'var(--gray-500)',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
