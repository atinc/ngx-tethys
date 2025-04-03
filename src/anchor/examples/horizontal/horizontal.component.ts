import { Component, OnInit } from '@angular/core';
import { ThyAnchor } from '../../anchor.component';
import { ThyAnchorLink } from '../../anchor-link.component';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'thy-anchor-horizontal-example',
    templateUrl: './horizontal.component.html',
    imports: [ThyAnchor, ThyAnchorLink, NgStyle]
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
