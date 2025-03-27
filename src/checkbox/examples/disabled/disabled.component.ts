import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyCheckboxDisabledExampleComponent implements OnInit {
    checked = true;

    model = {
        indeterminate: true,
        checkedAll: false
    };

    constructor() {}

    ngOnInit() {}
}
