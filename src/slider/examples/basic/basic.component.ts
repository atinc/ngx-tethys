import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-slider-basic',
    template: `
        <thy-slider class="mb-2" [(ngModel)]="value"></thy-slider>
        <p>当前值为： {{ value }}</p>
    `,
    imports: [ThySlider, FormsModule]
})
export class ThySliderBasicExampleComponent implements OnInit {
    public value: number;

    constructor() {}

    ngOnInit() {}
}
