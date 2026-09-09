import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-styles-display-example',
    templateUrl: './display.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider]
})
export class ThyStylesDisplayExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
