import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-tooltip-example',
    templateUrl: './tooltip.component.html',
    imports: [ThyRate, FormsModule]
})
export class ThyRateTooltipExampleComponent implements OnInit {
    value = 4;

    tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    constructor() {}

    ngOnInit() {}
}
