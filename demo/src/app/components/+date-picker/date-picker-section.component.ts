import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

@Component({
    selector: 'demo-date-picker-section',
    templateUrl: './date-picker-section.component.html'
})
export class DemoDataPickerSectionComponent implements OnInit {
    public state = {
        nowPreWeekDate: Math.floor(new Date().getTime() / 1000) - 90000 * 7,
        nowDate: Math.floor(new Date().getTime() / 1000),
        nowNextWeekDate: Math.floor(new Date().getTime() / 1000) + 90000 * 7,
        nowNextNextWeekDate: Math.floor(new Date().getTime() / 1000) + 90000 * 7 * 2
    };

    //#region DatePicker

    dateEntry = {
        date: this.state.nowDate,
        with_time: false
    };

    dateEntry2 = this.state.nowDate;

    dateEntryDisable = {
        date: this.state.nowDate,
        with_time: false
    };

    dateEntryWithTime = {
        date: this.state.nowDate,
        with_time: false
    };

    dateEntryWithTime2 = {
        date: this.state.nowDate,
        with_time: true
    };

    dateNull = null;
    dateNull2 = {
        date: null,
        with_time: false
    };
    dateNullObject = {};

    elementDateEntry = {
        date: this.state.nowDate,
        with_time: false
    };

    elementDateEntry2 = {
        date: this.state.nowDate,
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
            property: 'thyDatepicker',
            description: '组件指令',
            type: '',
            default: ''
        },
        {
            property: 'ngModel',
            description: '双向绑定值',
            type: 'DatepickerValueEntry',
            default: ''
        },
        {
            property: 'thyFormat',
            description: '格式化显示',
            type: 'String',
            default: 'yyyy-MM-dd'
        },
        {
            property: 'thyDisabled',
            description: '非Input时禁用，Input时直接使用 disabled',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyShowTime',
            description: "显示'设置时间'按钮",
            type: 'boolean',
            default: 'false'
        }
    ];

    constructor() {}

    ngOnInit() {}

    datepickerTestNewValue() {
        this.dateEntry = {
            date: this.state.nowNextWeekDate,
            with_time: false
        };
        this.dateEntry2 = this.state.nowNextWeekDate;

        this.dateEntryWithTime = {
            date: this.state.nowNextWeekDate,
            with_time: false
        };

        this.dateNull = null;
    }

    datepickerTestNullValue() {}

    daterangepickerTestNewValue() {
        this.dateRangeObjectTimestamp = {
            begin: { date: this.state.nowNextWeekDate },
            end: { date: this.state.nowNextNextWeekDate }
        };

        this.dateRangeTimestamp = {
            begin: this.state.nowNextWeekDate,
            end: this.state.nowNextNextWeekDate
        };

        this.dateRangeObjectTimestampNull = {
            begin: { date: this.state.nowNextWeekDate },
            end: { date: this.state.nowNextNextWeekDate }
        };

        this.dateRangeTimestampNull = {
            begin: this.state.nowNextWeekDate,
            end: this.state.nowNextNextWeekDate
        };

        this.dateRangeNull = {
            begin: { date: this.state.nowNextWeekDate },
            end: { date: this.state.nowNextNextWeekDate }
        };
    }

    daterangepickerTestNullValue() {
        this.dateRangeObjectTimestamp = {
            begin: { date: null },
            end: { date: null }
        };

        this.dateRangeTimestamp = {
            begin: null,
            end: null
        };

        this.dateRangeObjectTimestampNull = {
            begin: { date: null },
            end: { date: null }
        };

        this.dateRangeTimestampNull = {
            begin: null,
            end: null
        };

        this.dateRangeNull = null;
    }

    log($event) {
        console.log($event);
    }
}
