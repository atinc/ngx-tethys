import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-checkbox-basic',
    templateUrl: './basic.component.html'
})
export class DemoCheckboxBasicComponent implements OnInit {
    model = {
        checked1: true,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checkboxInline: false,
        disabled: false
    };

    constructor() {}

    ngOnInit(): void {}

    change() {
        console.log(`model change as ${this.model.checked1}`);
    }
}
