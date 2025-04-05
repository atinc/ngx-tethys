import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyRate, FormsModule]
})
export class ThyRateBasicExampleComponent implements OnInit {
    value = 1;

    tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    constructor() {}

    ngOnInit() {}

    hoverChange(value: number) {}
}
