import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'thy-anchor-nav-fake-example',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './nav-fake.component.html'
})
export class ThyAnchorNavFakeExampleComponent implements OnInit {
    demos: number[] = [];

    constructor() {}

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}
