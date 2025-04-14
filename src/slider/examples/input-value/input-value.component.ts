import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-slider-input-value-example',
    template: `
        <div class="input-container mb-2">
            <thy-slider [(ngModel)]="value"></thy-slider>
        </div>
        <thy-input-number [(ngModel)]="value" placeholder="请输入"></thy-input-number>
    `,
    imports: [ThySlider, ThyInputNumber, FormsModule]
})
export class ThySliderInputValueExampleComponent implements OnInit {
    public value: number;

    constructor() {}

    ngOnInit() {}
}
