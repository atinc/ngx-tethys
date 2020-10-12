import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-basic',
    template: `
        <thy-slider [(ngModel)]="value"></thy-slider>
        <p>当前值为： {{ value }}</p>
    `
})
export class ThySliderBasicExampleComponent implements OnInit {
    public value: number;

    constructor() {}

    ngOnInit() {}
}
