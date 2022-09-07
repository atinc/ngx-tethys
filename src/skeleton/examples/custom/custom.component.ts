import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-custom-example',
    templateUrl: './custom.component.html'
})
export class ThySkeletonExampleCustomComponent implements OnInit {
    model = {
        thyWidth: '100%',
        thyHeight: '1rem',
        thySize: '4rem',
        thyBorderRadius: '4px',
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#f6c659',
        thyAnimatedSpeed: 2,
        thyAnimated: true
    };
    constructor() {}

    ngOnInit() {}
}
