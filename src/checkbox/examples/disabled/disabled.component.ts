import { Component, OnInit } from '@angular/core';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-checkbox-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyCheckbox, FormsModule]
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
