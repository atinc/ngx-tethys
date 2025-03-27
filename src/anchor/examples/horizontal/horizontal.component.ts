import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-anchor-horizontal-example',
    templateUrl: './horizontal.component.html',
    standalone: false
})
export class ThyAnchorHorizontalExampleComponent implements OnInit {
    direction = 'horizontal';

    demos: number[] = [];

    constructor() {}

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}
