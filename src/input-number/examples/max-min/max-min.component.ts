import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-number-max-min-example',
    templateUrl: './max-min.component.html',
    standalone: false
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
