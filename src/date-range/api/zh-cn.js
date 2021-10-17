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
    },
    {
        type: 'class',
        name: 'DateRangeItemInfo参数',
        properties: [
            {
                name: 'begin',
                description: '开始时间',
                type: 'number',
                default: ''
            },
            {
                name: 'end',
                description: '截止时间',
                type: 'number',
                default: ''
            },
            {
                name: 'key',
                description: `时间段的唯一标识，如'week'、'month'`,
                type: 'string',
                default: ''
            },
            {
                name: 'text',
                description: '时间段的展示文本',
                type: 'string',
                default: ''
            },
            {
                name: 'timestamp',
                description: `自定义时间段规则，interval为时间间隔；unit可选值有'day' | 'month' | 'year'`,
                type: `{ interval: number, unit: AttachTypes }`,
                default: ''
            }
        ]
    }
];
