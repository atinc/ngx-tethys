import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-example-paragraph',
    templateUrl: './paragraph.component.html'
})
export class ThySkeletonExampleParagraphComponent implements OnInit {
    model = {
        thySize: 2,
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedSpeed: 2,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
