import { Component } from '@angular/core';
import { DateRangeItemInfo } from '../../../../../src/date-range/date-range.class';
import { helpers } from '../../../../../src/util';
import { getUnixTime, startOfQuarter, endOfQuarter, setMonth, getMonth, startOfMonth, endOfMonth } from 'date-fns';
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

    public minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);

    public maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7);

    public weekDate: DateRangeItemInfo;

    public apiParameters = [
        {
            property: 'thyDisabledSwitch',
            description: '隐藏左右切换时间段的 icon',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyCustomTextValue',
            description: '自定义日期选择的展示文字',
            type: 'string',
            default: '自定义'
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
            property: 'thyOptionalDateRanges',
            description: '可选值列表项',
            type: 'DateRangeItemInfo[]',
            default: '[{...}]'
        },
        {
            property: 'ngModelChange',
            description: '值发生改变回调函数',
            type: 'Function',
            default: ''
        }
    ];

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'season',
            text: '本季度',
            begin: getUnixTime(startOfQuarter(new Date())),
            end: getUnixTime(endOfQuarter(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        {
            key: 'lastThreeMonths',
            text: '最近三个月',
            begin: getUnixTime(startOfMonth(setMonth(new Date(), getMonth(new Date()) - 2))),
            end: getUnixTime(endOfMonth(new Date())),
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
