import { Component } from '@angular/core';

@Component({
    selector: 'thy-slider-disabled-example',
    template: ` <thy-slider [thyDisabled]="true" [ngModel]="62"></thy-slider> `,
    standalone: false
})
export class ThySliderDisabledExampleComponent {}
