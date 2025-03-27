import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-switch-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThySwitchDisabledExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}
}
