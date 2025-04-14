import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-count-example',
    templateUrl: './count.component.html',
    imports: [ThyRate, FormsModule]
})
export class ThyRateCountExampleComponent implements OnInit {
    value = 2;

    constructor() {}

    ngOnInit() {}
}
