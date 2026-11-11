import { Component, OnInit } from '@angular/core';
import { ThySkeleton, ThySkeletonCircle, ThySkeletonList, ThySkeletonRectangle } from 'ngx-tethys/skeleton';

@Component({
    selector: 'thy-skeleton-custom-example',
    templateUrl: './custom.component.html',
    imports: [ThySkeleton, ThySkeletonCircle, ThySkeletonRectangle, ThySkeletonList]
})
export class ThySkeletonExampleCustomComponent implements OnInit {
    // generalModel为circleSkeleton、rectangleSkeleton公共配置。
    generalModel = {
        thyPrimaryColor: 'var(--gray-200)',
        thySecondaryColor: 'var(--gray-10)',
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
