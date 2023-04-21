import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyCheckboxDisabledExampleComponent implements OnInit {
    checked1 = true;
    checked2 = true;

    model = {
        indeterminate: true,
        checkedAll: false
    };

    constructor() {}

    ngOnInit() {}

    selectAll() {
        this.model.indeterminate = !this.model.indeterminate;
    }
}
