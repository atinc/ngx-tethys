import { Component } from '@angular/core';
import { DateRangeItemInfo } from '../../../../../src/date-range/date-range.class';
import { helpers } from '../../../../../src/util';

@Component({
    selector: 'demo-date-range-section',
    templateUrl: './date-range-section.component.html'
})
export class DemoDateRangeSectionComponent {

    public date: DateRangeItemInfo;

    public dateHasConfig: DateRangeItemInfo;

    public apiParameters = [{
        property: 'ngModel',
        description: '双向绑定值,选中的可选值列表项或者具体时间',
        type: 'DateRangeItemInfo',
        default: ''
    }, {
        property: 'dateRanges',
        description: '可选值列表项',
        type: 'DateRangeItemInfo[]',
        default: ''
    }, {
        property: 'ngModelChange',
        description: '值发生改变回调函数',
        type: 'Function',
        default: ''
    }];

    private _allDayTimestamp = 24 * 60 * 60 * 1000;

    private _currentDayTime: any = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

    public dateRanges: DateRangeItemInfo[] = [{
        key: '3month',
        text: '近三个月',
        begin: helpers.formatDate(new Date((new Date()).getFullYear(), (new Date()).getMonth()-2, 1)),
        end: helpers.formatDate(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0)),
        timestamp: {
            interval: 3,
            unit: 'month'
        }
    }];

    change() {
    }

    changeValue() {
        this.date = {
            begin: 1535603426,
            end: 1535613426,
        };
    }
}
