import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

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

    //#region DatePicker

    dateEntry = {
        date: Math.floor((new Date()).getTime() / 1000) + 90000 * 7,
        with_time: true
    };

    dateEntry2 = Math.floor((new Date()).getTime() / 1000);

    dateEntryDisable = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

    dateEntryWithTime = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

    dateEntryWithTime2 = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: true
    };

    dateNull = null;
    dateNull2 = {
        date: null,
        with_time: false
    };
    dateNullObject = {};

    elementDateEntry = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

    elementDateEntry2 = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

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
