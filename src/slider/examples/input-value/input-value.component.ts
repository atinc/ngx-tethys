import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-input-value-example',
    template: `
        <div class="input-container mb-2">
            <thy-slider [(ngModel)]="value"></thy-slider>
        </div>
        <input thyInput type="number" [(ngModel)]="value" placeholder="请输入" />
    `
})
export class ThySliderInputValueExampleComponent implements OnInit {
    public value: number;

    constructor() {}

    ngOnInit() {}
}
