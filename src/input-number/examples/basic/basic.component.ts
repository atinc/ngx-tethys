import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-number-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyInputNumberBasicExampleComponent implements OnInit {
    value: string | number = 0;

    value2: string = '11a';

    step = 1;

    max = 10;

    suffix = '%';

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }
}
