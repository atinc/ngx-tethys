import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-configurable',
    templateUrl: './configurable.component.html',
    styleUrls: ['./configurable.component.scss'],
    standalone: false
})
export class ThySliderConfigurableExampleComponent implements OnInit {
    public value = 0;

    public max = 100;

    public min = 0;

    public step = 1;

    constructor() {}

    ngOnInit() {}
}
