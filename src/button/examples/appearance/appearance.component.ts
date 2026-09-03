import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonAppearance, ThyButtonGroup, ThyButtonType } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThyButtonGroup, ThySpace, ThySpaceItemDirective, NgClass]
})
export class ThyButtonAppearanceExampleComponent implements OnInit {
    appearances: ThyButtonAppearance[] = ['fill', 'outline', 'link'];

    types: ThyButtonType[] = ['default', 'primary', 'info', 'warning', 'danger', 'success'];

    appearance: ThyButtonAppearance = 'fill';

    constructor() {}

    ngOnInit(): void {}
}
