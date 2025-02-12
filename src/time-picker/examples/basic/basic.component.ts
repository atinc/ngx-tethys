import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyTimePickerBasicExampleComponent implements OnInit {
    fullTime: Date;

    time: Date = new Date();

    constructor() {}

    ngOnInit() {}

    onChange(e: Date) {
        console.log(e);
    }
}
