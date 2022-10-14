import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-custom-example',
    templateUrl: './custom.component.html'
})
export class ThySkeletonExampleCustomComponent implements OnInit {
    // generalModel为circleSkeleton、rectangleSkeleton公共配置。
    generalModel = {
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#ffffff',
        thyAnimatedInterval: 2,
        thyAnimated: true
    };
    circleModel = {
        thySize: '4rem'
    };
    rectangleModel = {
        thyRowWidth: '100%',
        thyRowHeight: '1rem',
        thyBorderRadius: '4px'
    };

    constructor() {}

    ngOnInit() {}
}
