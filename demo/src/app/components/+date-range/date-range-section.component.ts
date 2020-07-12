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

    public dateHasShowDateConfig: DateRangeItemInfo;

    public dateHasCustomValue: DateRangeItemInfo;

    public dateHasMaxMinDate: DateRangeItemInfo;

    public minDate = new Date('2020-01-01');

    public maxDate = new Date();

    weekDate;

    public apiParameters = [
        {
            property: 'thyShowDateValue',
            description: '显示 YYYY-MM-DD ~ YYYY-MM-DD 格式的日期',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyCustomValue',
            description: '自定义日期选择的展示文字',
            type: 'String',
            default: ''
        },
        {
            property: 'thyMinDate',
            description: '可选择的最小时间',
            type: 'Date',
            default: null
        },
        {
            property: 'thyMaxDate',
            description: '可选择的最大时间',
            type: 'Date',
            default: null
        },
        {
            property: 'ngModel',
            description: '双向绑定值,选中的可选值列表项或者具体时间',
            type: 'DateRangeItemInfo',
            default: ''
        },
        {
            property: 'dateRanges',
            description: '可选值列表项',
            type: 'DateRangeItemInfo[]',
            default: ''
        },
        {
            property: 'ngModelChange',
            description: '值发生改变回调函数',
            type: 'Function',
            default: ''
        }
    ];

    private _allDayTimestamp = 24 * 60 * 60 * 1000;

    private _currentDayTime: any = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: '3month',
            text: '近三个月',
            begin: helpers.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)),
            end: helpers.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    public weekDateRanges: DateRangeItemInfo[] = [
        {
            key: 'week',
            text: '近俩周',
            begin: helpers.formatDate(new Date(2019, 1, 11)),
            end: helpers.formatDate(new Date(2019, 1, 17)),
            timestamp: {
                interval: 14,
                unit: 'day'
            }
        }
    ];

    change() {
        this.weekDateRanges = [
            {
                key: 'week',
                text: '近俩周',
                begin: helpers.formatDate(new Date(2019, 1, 11)),
                end: helpers.formatDate(new Date(2019, 1, 17)),
                timestamp: {
                    interval: 14,
                    unit: 'day'
                }
            }
        ];
    }

    changeValue() {
        this.date = {
            begin: 1535603426,
            end: 1535613426
        };
    }
}
