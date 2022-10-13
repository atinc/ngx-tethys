import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-circle-example',
    templateUrl: './circle.component.html'
})
export class ThySkeletonExampleCircleComponent implements OnInit {
    model = {
        thySize: 32,
        thyPrimaryColor: '#F7F7F7',
        thySecondaryColor: '#eeeeee',
        thyAnimatedInterval: 1,
        thyAnimated: true
    };
    constructor() {}
    disabledNode() {}
    ngOnInit() {}
}
