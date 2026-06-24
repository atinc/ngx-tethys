import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAnchorLink, ThyAnchor } from 'ngx-tethys/anchor';

@Component({
    selector: 'thy-anchor-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAnchor, ThyAnchorLink]
})
export class ThyAnchorBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
