import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTimePickerBasicExampleComponent implements OnInit {
    fullTime: Date;

    time: Date;

    constructor() {}

    ngOnInit() {}

    onChange(e: Date) {
        this.fullTime = e;
    }
}
