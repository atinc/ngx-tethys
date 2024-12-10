import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-switch-type-example',
    templateUrl: './type.component.html',
    standalone: false
})
export class ThySwitchTypeExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}
}
