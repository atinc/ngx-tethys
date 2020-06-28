import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-switch-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySwitchBasicExampleComponent implements OnInit {
    isChecked: Boolean = true;

    constructor() {}

    ngOnInit() {}

    switchChange() {
        console.log(this.isChecked + '11');
    }
}
