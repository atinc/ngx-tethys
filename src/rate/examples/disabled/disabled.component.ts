import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyRate, FormsModule]
})
export class ThyRateDisabledExampleComponent implements OnInit {
    value = 2;

    constructor() {}

    ngOnInit() {}
}
