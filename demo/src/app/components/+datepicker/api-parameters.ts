export const apiParameters = [
    {
        property: 'thyAllowClear',
        description: '是否显示清除按钮',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'thyAutoFocus',
        description: '自动获取焦点',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyDisabled',
        description: '禁用',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyReadonly',
        description: '只读',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyMinDate',
        description: '最小值',
        type: 'Date | {date: number, with_time: 0 | 1} | number | string',
        default: '-'
    },
    {
        property: 'thyMaxDate',
        description: '最大值',
        type: 'Date | {date: number, with_time: 0 | 1} | number | string',
        default: '-'
    },
    {
        property: 'thySize',
        description: '输入框大小，xs | sm | md | lg | default',
        type: 'xs | sm | md | lg | default',
        default: 'default'
    },
    {
        property: 'thyOriginClassName',
        description: '选择器 className',
        type: 'string',
        default: '""'
    },
    {
        property: 'thyPanelClassName',
        description: '弹出层 className',
        type: 'string',
        default: '""'
    }
];

export const apiDatePickerParameters = [
    {
        property: 'ngModel',
        description: '日期',
        type: 'Date | {date: number, with_time: 0 | 1} | number | string',
        default: '-'
    },
    {
        property: 'thyFormat',
        description: '展示的日期格式',
        type: 'string',
        default: '"yyyy-MM-dd"'
    },
    {
        property: 'thyShowTime',
        description: '增加时间选择功能',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyPlaceHolder',
        description: '输入框提示文字',
        type: 'string',
        default: '-'
    },
    {
        property: 'ngModelChange',
        description: '时间发生变化的回调',
        type: 'EventEmitter<Date>',
        default: '-'
    }
];

export const apiRangePickerParameters = [
    { property: 'ngModel', description: '日期', type: '{ begin: number | Date, end: number | Date }', default: '-' },
    {
        property: 'thyFormat',
        description: '展示的日期格式',
        type: 'string',
        default: 'yyyy-MM-dd'
    },
    {
        property: 'thyPlaceHolder',
        description: '输入框提示文字',
        type: 'string | string[]',
        default: '-'
    },
    {
        property: 'ngModelChange',
        description: '时间发生变化的回调',
        type: 'EventEmitter<Date>',
        default: '-'
    }
];
