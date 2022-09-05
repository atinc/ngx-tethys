import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-circle-example',
    templateUrl: './circle.component.html'
})
export class ThySkeletonExampleCircleComponent implements OnInit {
    isDisabled = false;
    model = {
        thySize: 2,
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedSpeed: 2,
        thyAnimated: true
    };
    constructor() {}
    disabledNode() {}
    ngOnInit() {}
}
