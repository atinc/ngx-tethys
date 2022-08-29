import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-skeleton-custom-example',
    templateUrl: './custom.component.html'
})
export class ThySkeletonExampleCustomComponent implements OnInit {
    model = {
        circleSize: 1
    };
    constructor() {}

    ngOnInit() {}
}
