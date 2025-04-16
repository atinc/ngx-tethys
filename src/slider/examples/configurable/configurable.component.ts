import { Component, OnInit } from '@angular/core';
import { ThySlider } from 'ngx-tethys/slider';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-slider-configurable',
    templateUrl: './configurable.component.html',
    styleUrls: ['./configurable.component.scss'],
    imports: [ThySlider, FormsModule, ThyInputDirective]
})
export class ThySliderConfigurableExampleComponent implements OnInit {
    public value = 0;

    public max = 100;

    public min = 0;

    public step = 1;

    constructor() {}

    ngOnInit() {}
}
