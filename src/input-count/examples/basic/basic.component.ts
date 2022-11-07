import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-count-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyInputCountBasicExampleComponent implements OnInit {
    value: string | number;

    isChecked: boolean = true;

    thyMaxLength = 120;

    appendText: string = '© PingCode';

    constructor() {}

    ngOnInit() {}

    change(value: number) {
        console.log(value);
    }

    checkedChange(isChecked: boolean) {
        this.appendText = isChecked ? '© PingCode' : '';
    }
}
