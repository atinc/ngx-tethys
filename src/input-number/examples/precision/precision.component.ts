import { Component } from '@angular/core';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-input-number-precision-example',
    templateUrl: './precision.component.html',
    imports: [ThyInputNumber, FormsModule]
})
export class ThyInputNumberPrecisionExampleComponent {
    value: number = 1.1;

    value2: number = 2.22;

    value3: number = 3.33;

    precision: number = 1;

    change(value: number) {
        console.log(value);
    }
}
