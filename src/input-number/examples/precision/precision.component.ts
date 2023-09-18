import { Component } from '@angular/core';

@Component({
    selector: 'thy-input-number-precision-example',
    templateUrl: './precision.component.html'
})
export class ThyInputNumberPrecisionExampleComponent {
    value: number = 1.1;

    value2: number = 2.22;

    precision: number = 1;

    change(value: number) {
        console.log(value);
    }
}
