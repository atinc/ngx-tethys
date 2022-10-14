import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-paragraph',
    templateUrl: './paragraph.component.html'
})
export class ThySkeletonExampleParagraphComponent implements OnInit {
    model = {
        thyRowsCount: 4,
        thyFirstWidth: '33%',
        thyLastWidth: '66%',
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: '4px',
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#eeeeee',
        thyAnimatedInterval: 1.5,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
