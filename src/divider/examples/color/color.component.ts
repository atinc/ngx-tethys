import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ThyDivider, ThyDividerColor } from 'ngx-tethys/divider';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-color-example',
    templateUrl: './color.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDivider, ThyButtonGroup, ThyButton, NgClass]
})
export class ThyDividerColorExampleComponent {
    color: ThyDividerColor = 'lighter';

    colors = ['light', 'lighter', 'danger', 'primary', 'success', 'warning'];
}
