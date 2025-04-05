import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputNumber } from 'ngx-tethys/input-number';

@Component({
    selector: 'thy-input-number-size-example',
    templateUrl: './size.component.html',
    imports: [ThyInputNumber, FormsModule]
})
export class ThyInputNumberSizeExampleComponent implements OnInit {
    value: number;

    step = 1;

    max = 10;

    sizes = ['xs', 'sm', 'md', 'lg'];

    suffix = '%';

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }
}
