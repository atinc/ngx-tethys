import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-switch-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThySwitchSizeExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}
}
