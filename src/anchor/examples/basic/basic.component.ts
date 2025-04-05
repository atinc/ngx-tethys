import { Component, OnInit } from '@angular/core';
import { ThyAnchorLink } from 'ngx-tethys/anchor';
import { ThyAnchor } from 'ngx-tethys/anchor';

@Component({
    selector: 'thy-anchor-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyAnchor, ThyAnchorLink]
})
export class ThyAnchorBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
