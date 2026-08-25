import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRate } from 'ngx-tethys/rate';

@Component({
    selector: 'thy-rate-half-example',
    templateUrl: './half.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRate, FormsModule]
})
export class ThyRateHalfExampleComponent implements OnInit {
    value = 3.5;

    constructor() {}

    ngOnInit() {}
}
