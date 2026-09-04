import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-slider-disabled-example',
    template: ` <thy-slider [thyDisabled]="true" [ngModel]="62"></thy-slider> `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySlider, FormsModule]
})
export class ThySliderDisabledExampleComponent {}
