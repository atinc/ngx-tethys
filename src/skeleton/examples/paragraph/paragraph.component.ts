import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-paragraph',
    templateUrl: './paragraph.component.html'
})
export class ThySkeletonExampleParagraphComponent implements OnInit {
    model = {
        thyRows: 4,
        thySections: 2,
        thyFirstWidth: '33%',
        thyLastWidth: '66%',
        thyWidth: '100%',
        thyHeight: '1rem',
        thyBorderRadius: '4px',
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#18a0e0',
        thyAnimatedSpeed: 2,
        thyAnimated: true,
        thySectionClass: 'mb-4',
        thyItemClass: 'mb-2 m3-1'
    };
    constructor() {}

    ngOnInit() {}
}
