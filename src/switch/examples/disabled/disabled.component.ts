import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-switch-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThySwitchDisabledExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}
}
