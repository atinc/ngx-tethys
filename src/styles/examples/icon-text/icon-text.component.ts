import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-styles-icon-text-example',
    templateUrl: './icon-text.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyStylesIconTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
