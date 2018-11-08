import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { DatepickerNextTimeModeType } from '../../../../../src/datepicker-next/datepicker-next.interface';

@Component({
    selector: 'demo-datepicker-next-section',
    templateUrl: './datepicker-next-section.component.html'
})
export class DemoDatepickerNextSectionComponent implements OnInit {

    private state = {
        nowDate: Math.floor((new Date()).getTime() / 1000),
        nowNextWeekDate: Math.floor((new Date()).getTime() / 1000) + 90000 * 7,
        nowNextNextWeekDate: Math.floor((new Date()).getTime() / 1000) + 90000 * 7 * 2,
    };

    datepickerNextTimeModeType = DatepickerNextTimeModeType;

    //#region DatePickerNext

    objectTimestamp = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: true
    };
    objectTimestamp2 = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: true
    };
    objectTimestampLong = {
        date: Math.floor((new Date()).getTime()),
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
    timestamp = Math.floor((new Date()).getTime() / 1000);
    timestampLong = Math.floor((new Date()).getTime());
    date = new Date();
    empty = null;

    //#endregion

    //#region DateRangePicker

    dateRangeObjectTimestamp = {
        begin: { date: this.state.nowDate },
        end: { date: this.state.nowNextWeekDate }
    };

    dateRangeTimestamp = {
        begin: this.state.nowDate,
        end: this.state.nowNextWeekDate
    };

    dateRangeObjectTimestampNull = {
        begin: { date: null },
        end: { date: null }
    };

    dateRangeTimestampNull = {
        begin: null,
        end: null
    };

    dateRangeNull = null;

    //#endregion

    apiParameters = [
        {
            property: 'thyValueChange',
            description: '组件指令',
            type: '',
            default: ''
        },
    ];

    constructor() { }

    ngOnInit() {
    }

    onSelect(result) {
        console.log(result);
    }
}
