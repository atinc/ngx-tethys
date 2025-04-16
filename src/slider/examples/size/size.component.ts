import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-slider-size-example',
    template: `
        <thy-slider class="mb-2" [ngModel]="value" thySize="sm"></thy-slider>
        <thy-slider class="mb-2" [ngModel]="value" thySize="md" [thyType]="'warning'"></thy-slider>
        <thy-slider [ngModel]="value" thySize="lg"></thy-slider>
    `,
    imports: [ThySlider, FormsModule]
})
export class ThySliderSizeExampleComponent implements OnInit {
    value = 40;

    constructor() {}

    ngOnInit() {}
}
