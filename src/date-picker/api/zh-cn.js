module.exports = [
    {
        type: 'component',
        name: 'common',
        description: '参数列表',
        properties: [
            {
                name: 'thyLabelText',
                description: '选择框 Label 展示文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyAllowClear',
                description: '是否显示清除按钮',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyAutoFocus',
                description: '自动获取焦点',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabled',
                description: '禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyReadonly',
                description: '只读',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyMinDate',
                description: '最小值',
                type: 'Date | {date: number, with_time: 0 | 1} | number | string',
                default: '-'
            },
            {
                name: 'thyMaxDate',
                description: '最大值',
                type: 'Date | {date: number, with_time: 0 | 1} | number | string',
                default: '-'
            },
            {
                name: 'thyDefaultPickerValue',
                description: '面板默认日期',
                type: 'Date | {date: number, with_time: 0 | 1} | number | string',
                default: '-'
            },
            {
                name: 'thySize',
                description: '输入框大小，xs | sm | md | lg | default',
                type: 'xs | sm | md | lg | default',
                default: 'default'
            },
            {
                name: 'thySuffixIcon',
                description: '自定义的后缀图标',
                type: 'string',
                default: 'calendar'
            },
            {
                name: 'thyOriginClassName',
                description: '选择器 className',
                type: 'string',
                default: '""'
            },
            {
                name: 'thyPanelClassName',
                description: '弹出层 className',
                type: 'string',
                default: '""'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-data-picker',
        description: '参数列表',
        properties: [
            {
                name: 'ngModel',
                description: '日期',
                type: 'Date | {date: number, with_time: 0 | 1} | number | string',
                default: '-'
            },
            {
                name: 'thyFormat',
                description: '展示的日期格式',
                type: 'string',
                default: '"yyyy-MM-dd"'
            },
            {
                name: 'thyShowTime',
                description: '增加时间选择功能',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyPlaceHolder',
                description: '输入框提示文字',
                type: 'string',
                default: '-'
            },
            {
                name: 'ngModelChange',
                description: '时间发生变化的回调',
                type: 'EventEmitter<Date>',
                default: '-'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-range-picker',
        description: '参数列表',
        properties: [
            { name: 'ngModel', description: '日期', type: '{ begin: number | Date, end: number | Date }', default: '-' },
            {
                name: 'thyFormat',
                description: '展示的日期格式',
                type: 'string',
                default: 'yyyy-MM-dd'
            },
            {
                name: 'thyPlaceHolder',
                description: '输入框提示文字',
                type: 'string | string[]',
                default: '-'
            },
            {
                name: 'ngModelChange',
                description: '时间发生变化的回调',
                type: 'EventEmitter<Date>',
                default: '-'
            }
        ]
    },
    {
        type: 'DIRECTIVE',
        name: 'thyDatePicker',
        properties: [
            {
                name: 'thyMode',
                description: `模式，'decade' | 'year' | 'month' | 'date'`,
                type: 'string|string[]',
                default: ''
            },
            {
                name: 'thyPlacement',
                description: `弹出位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'`,
                type: 'string',
                default: 'bottom'
            },
            {
                name: 'thyOffset',
                description: '弹出 DatePicker 的偏移量',
                type: 'number',
                default: '4'
            },
            {
                name: 'thyMustShowTime',
                description: '是否展示时间(时、分)',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyHasBackdrop',
                description: '是否有幕布',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyStopPropagation',
                description: '是否阻止冒泡',
                type: 'boolean',
                default: 'true'
            }
        ]
    }
];
