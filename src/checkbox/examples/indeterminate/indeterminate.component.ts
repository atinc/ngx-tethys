import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-indeterminate-example',
    templateUrl: './indeterminate.component.html',
    standalone: false
})
export class ThyCheckboxIndeterminateExampleComponent implements OnInit {
    model = {
        checked1: true,
        checked2: false,
        checked3: false,
        indeterminate: true,
        checkedAll: false
    };

    constructor() {}

    ngOnInit(): void {}

    select() {
        if (this.model.checked1 && this.model.checked2 && this.model.checked3) {
            this.model.indeterminate = false;
            this.model.checkedAll = true;
        } else if (!this.model.checked1 && !this.model.checked2 && !this.model.checked3) {
            this.model.indeterminate = false;
            this.model.checkedAll = false;
        } else {
            this.model.indeterminate = true;
            this.model.checkedAll = false;
        }
    }

    selectAll() {
        this.model.checked1 = this.model.checked2 = this.model.checked3 = this.model.checkedAll;
        this.model.indeterminate = false;
    }
}
