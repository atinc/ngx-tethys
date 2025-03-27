import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-switch-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThySwitchBasicExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}

    switchChange() {}
}
