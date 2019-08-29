import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-property-operation-basic',
    templateUrl: './basic.component.html'
})
export class DemoPropertyOperationBasicComponent implements OnInit {
    startDate: null;

    disabled = false;

    dateTime = {
        date: Math.floor(new Date().valueOf() / 1000),
        with_time: false
    };

    dueDateTimeStamp = this.dateTime.date - 3600;

    showClose = false;

    labelHideWhenHasValue = false;

    type = '';

    constructor() {}

    ngOnInit() {}

    public removeDateTime() {
        this.dateTime = {
            date: null,
            with_time: false
        };
    }

    sayHi() {
        console.log('hi!');
    }
}
