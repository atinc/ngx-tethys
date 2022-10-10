import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-rectangle-example',
    template: `
        <thy-skeleton-rectangle thyAnimatedInterval="1.2" [thyAnimated]="true" thySecondaryColor="#ffffff"> </thy-skeleton-rectangle>
    `
})
export class ThySkeletonExampleRectangleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
