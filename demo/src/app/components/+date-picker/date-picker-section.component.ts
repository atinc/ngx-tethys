import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

@Component({
    selector: 'demo-date-picker-section',
    templateUrl: './date-picker-section.component.html'
})
export class DemoDataPickerSectionComponent implements OnInit {

    dateEntry = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
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

    elementDateEntry = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

    elementDateEntry2 = {
        date: Math.floor((new Date()).getTime() / 1000),
        with_time: false
    };

    dateRangeEntry = {
        begin: { date: Math.floor((new Date()).getTime() / 1000) },
        end: { date: Math.floor((new Date()).getTime() / 1000) + 90000 * 3 }
    };

    dateRangeNullValue = null;

    Datepicker: Date;

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
            description: '显示\'设置时间\'按钮',
            type: 'boolean',
            default: 'false'
        },
    ];

    constructor() { }

    ngOnInit() {
    }

    test() {
        this.dateEntry = {
            date: Math.floor((new Date()).getTime() / 1000),
            with_time: false
        };

        this.dateNull = Math.floor((new Date()).getTime() / 1000);

    }

    test2() {
        this.dateRangeEntry = {
            begin: { date: Math.floor((new Date()).getTime() / 1000) },
            end: { date: Math.floor((new Date()).getTime() / 1000) + 90000 * 7 }
        };

        this.dateRangeNullValue = {
            begin: { date: Math.floor((new Date()).getTime() / 1000) },
            end: { date: Math.floor((new Date()).getTime() / 1000) + 90000 * 7 }
        };

    }

    log($event) {
        console.log($event);
    }
}
