import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-custom-example',
    templateUrl: './custom.component.html'
})
export class ThySkeletonExampleCustomComponent implements OnInit {
    // generalModel为circleSkeleton、rectangleSkeleton公共配置。
    generalModel = {
        thyPrimaryColor: 'var(--color-40)',
        thySecondaryColor: 'var(--color-0)',
        thyAnimatedInterval: 2,
        thyAnimated: true
    };

    circleModel = {
        thySize: '4rem'
    };

    rectangleModel = {
        thyRowWidth: '100%',
        thyRowHeight: '20px',
        thyBorderRadius: '4px'
    };

    constructor() {}

    ngOnInit() {}
}
