import { Component, OnInit } from '@angular/core';
import { apiParameters } from './api-parameters';

@Component({
    selector: 'property-operation-section',
    templateUrl: './property-operation-section.component.html',
    styleUrls: ['./property-operation.scss']
})
export class DemoPropertyOperationSectionComponent implements OnInit {
    startDate: null;

    dateTime = {
        date: Math.floor(new Date().valueOf() / 1000),
        with_time: false
    };

    dueDateTimeStamp = this.dateTime.date - 3600;

    apiParameters = apiParameters;

    basicCodeExample = require('!!raw-loader!./basic/basic.component.html');

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
}
