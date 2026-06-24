import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-input-number-max-min-example',
    templateUrl: './max-min.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputNumber, FormsModule]
})
export class ThyInputNumberMaxMinExampleComponent implements OnInit {
    minValue = 0;

    maxValue = 10;

    step = 1;

    max = 10;

    min = 0;

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }
}
