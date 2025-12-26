import { Component, OnInit } from '@angular/core';

import { ThyInputNumber } from 'ngx-tethys/input-number';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-input-number-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyInputNumber, FormsModule]
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
