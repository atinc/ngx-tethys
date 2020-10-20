import { Component } from '@angular/core';

@Component({
    selector: 'thy-slider-disabled-example',
    template: `
        <thy-slider [thyDisabled]="true" [ngModel]="62"></thy-slider>
    `
})
export class ThySliderDisabledExampleComponent {}
