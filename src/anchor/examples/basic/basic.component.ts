import { Component, OnInit } from '@angular/core';
import { ThyAnchor } from '../../anchor.component';
import { ThyAnchorLink } from '../../anchor-link.component';

@Component({
    selector: 'thy-anchor-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyAnchor, ThyAnchorLink]
})
export class ThyAnchorBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
