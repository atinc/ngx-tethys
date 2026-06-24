import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-styles-text-example',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider]
})
export class ThyStylesTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
