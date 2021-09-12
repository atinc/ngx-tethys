module.exports = [
    {
        type: 'component',
        name: 'thy-date-range',
        description: '预设时间段及自定义时间段选择',
        properties: [
            {
                name: 'ngModel',
                description: '绑定的日期区间',
                type: 'DateRangeItemInfo',
                default: ''
            },
            {
                name: 'thyOptionalDateRanges',
                description: '自定义可选值列表项',
                type: 'DateRangeItemInfo[]',
                default: ''
            },
            {
                name: 'thyHiddenMenu',
                description: '隐藏下拉选择时间段',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabledSwitch',
                description: '禁用左右切换时间段',
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
                name: 'thyCustomKey',
                description: '值有`custom`和`exception`。当值为`exception`，`thyPickerFormat`设置的自定义格式才会生效',
                type: 'string',
                default: 'custom'
            },
            {
                name: 'thyPickerFormat',
                description: '自定义日期展示格式，只有当`thyCustomKey`值设为`custom`时才会生效',
                type: 'string',
                default: ''
            }
        ]
    }
];
