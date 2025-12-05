import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThySwitch, FormsModule]
})
export class ThySwitchDisabledExampleComponent implements OnInit {
    isChecked: boolean = true;

    constructor() {}

    ngOnInit() {}
}
