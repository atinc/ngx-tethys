module.exports = [
    {
        type: 'component',
        name: 'thy-date-range',
        description: '预设时间段及自定义时间段选择',
        properties: [
            {
                name: 'thyHiddenMenu',
                description: '隐藏时间选择弹窗',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabledSwitch',
                description: '隐藏左右切换时间段的 icon',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyCustomTextValue',
                description: '自定义日期选择的展示文字',
                type: 'string',
                default: '自定义'
            },
            {
                name: 'thyMinDate',
                description: '自定义日期选择中可选择的最小时间',
                type: 'Date',
                default: null
            },
            {
                name: 'thyMaxDate',
                description: '自定义日期选择中可选择的最大时间',
                type: 'Date',
                default: null
            },
            {
                name: 'thyOptionalDateRanges',
                description: '可选值列表项',
                type: 'DateRangeItemInfo[]',
                default: 'DateRangeItemInfo[]'
            },
            {
                name: 'ngModel',
                description: '绑定的日期值',
                type: 'DateRangeItemInfo',
                default: ''
            }
        ]
    }
];
