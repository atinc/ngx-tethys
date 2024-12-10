import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-number-step-example',
    templateUrl: './step.component.html',
    standalone: false
})
export class ThyInputNumberStepExampleComponent implements OnInit {
    valueOfStep1 = 1;

    valueOfStep2 = 1;

    step1 = 0.1;

    step2 = 2;

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }
}
