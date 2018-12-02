import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { DatepickerNextTimeModeType } from '../../../../../src/datepicker-next/datepicker-next.interface';

@Component({
    selector: 'demo-datepicker-next-section',
    templateUrl: './datepicker-next-section.component.html'
})
export class DemoDatepickerNextSectionComponent implements OnInit {
    private state = {
        nowTimestamp: Math.floor(new Date().getTime() / 1000),
        nowObjectTimestamp: Math.floor(new Date().getTime() / 1000),
        nowNextWeekDate: Math.floor(new Date().getTime() / 1000) + 90000 * 7,
        nowNextNextWeekDate:
            Math.floor(new Date().getTime() / 1000) + 90000 * 7 * 2
    };

    datepickerNextTimeModeType = DatepickerNextTimeModeType;

    //#region DatePickerNext

    value1 = { date: this.state.nowTimestamp, with_time: false };
    value2 = { date: this.state.nowTimestamp, with_time: true };
    value3 = { date: this.state.nowTimestamp, with_time: false };
    value4 = { date: this.state.nowTimestamp, with_time: true };
    value5 = { with_time: false };
    value6 = { with_time: false };
    minDate = {
        date: new Date(2018, 10, 10),
        with_time: true
    };
    maxDate = {
        date: new Date(2018, 10, 10),
        with_time: true
    };

    objectTimestamp = {
        date: Math.floor(new Date().getTime() / 1000),
        with_time: true
    };
    objectTimestampLong = {
        date: Math.floor(new Date().getTime()),
        with_time: false
    };
    objectDate = {
        date: new Date(),
        with_time: true
    };
    objectEmpty = {
        date: null,
        with_time: true
    };
    timestamp = Math.floor(new Date().getTime() / 1000);
    timestampLong = Math.floor(new Date().getTime());
    date = new Date();
    empty = null;

    //#endregion

    //#region DateRangePicker

    //#endregion

    apiParameters = [
        {
            property: 'thyValueChange',
            description: '组件指令',
            type: '',
            default: ''
        }
    ];

    constructor() {}

    ngOnInit() {}

    onSelect(result) {
        console.log(result);
    }
}
