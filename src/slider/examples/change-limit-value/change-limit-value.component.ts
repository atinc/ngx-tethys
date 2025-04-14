import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';

@Component({
    selector: 'thy-slider-change-limit-value',
    template: ` <thy-slider [thyMax]="max" [thyMin]="min" [thyStep]="step"></thy-slider> `,
    imports: [ThySlider]
})
export class ThySliderChangeLimitValueExampleComponent implements OnInit {
    public max = 200;

    public min = 150;

    public step = 5;

    constructor() {}

    ngOnInit() {}
}
