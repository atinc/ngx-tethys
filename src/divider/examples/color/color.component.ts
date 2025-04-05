import { Component, ViewEncapsulation } from '@angular/core';
import { ThyDivider, ThyDividerColor } from 'ngx-tethys/divider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-color-example',
    templateUrl: './color.component.html',
    imports: [ThyDivider]
})
export class ThyDividerColorExampleComponent {
    color: ThyDividerColor = 'default';
    colors = ['default', 'light', 'danger', 'primary', 'success', 'warning'];
    constructor() {}
}
