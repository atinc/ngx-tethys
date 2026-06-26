import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-vertical-example',
    templateUrl: './vertical.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider]
})
export class ThyDividerVerticalExampleComponent {
    constructor() {}
}
