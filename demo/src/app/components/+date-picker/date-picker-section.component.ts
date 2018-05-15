import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';

@Component({
    selector: 'demo-date-picker-section',
    templateUrl: './date-picker-section.component.html'
})
export class DemoDataPickerSectionComponent implements OnInit {

    onlyDate = new Date();

    dateEntry = {
        date: new Date(),
        with_time: false
    };

    elementDateEntry = {
        date: new Date(),
        with_time: false
    };

    dateEntryWithTime = {
        date: new Date(),
        with_time: true
    };

    dateTime = Math.floor((new Date()).getTime() / 1000);

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
            property: 'thyWithTime',
            description: '显示\'设置时间\'按钮',
            type: 'boolean',
            default: 'false'
        },
    ];

    constructor() { }

    ngOnInit() {
    }

    log($event) {
        console.log($event);
    }
}
