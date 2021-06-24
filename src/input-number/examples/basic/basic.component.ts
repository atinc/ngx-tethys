import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-number-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyInputNumberBasicExampleComponent implements OnInit {
    value = 0;

    step = 1;

    max = 10;

    sizes = ['sm', 'md', 'lg'];

    suffix = '%';

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }
}
