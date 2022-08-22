module.exports = [
    {
        type: 'component',
        name: 'thy-time-picker',
        description: '参数列表',
        properties: [
            { name: 'ngModel', description: '绑定的值', type: 'Date', default: '-' },
            {
                name: 'thyFormat',
                description: '展示的日期格式: HH:mm:ss / HH:mm',
                type: 'string',
                default: 'HH:mm:ss'
            },
            {
                name: 'thyHourStep',
                description: '小时步长',
                type: 'number',
                default: '1'
            },
            {
                name: 'thyMinuteStep',
                description: '分钟步长',
                type: 'number',
                default: '1'
            },
            {
                name: 'thySecondStep',
                description: '秒步长',
                type: 'number',
                default: '1'
            },
            {
                name: 'thyPlaceholder',
                description: '输入框提示文字',
                type: 'string',
                default: '选择日期'
            },
            {
                name: 'thySize',
                description: '输入框大小',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'default'",
                default: 'default'
            },
            {
                name: 'thyPlacement',
                description: '弹出位置',
                type:
                    "'top' | 'topLeft'| 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'",
                default: 'default'
            },
            {
                name: 'thyPopupClass',
                description: '弹出层 className',
                type: 'number',
                default: '-'
            },
            {
                name: 'thyDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyReadonly',
                description: '是否只读',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyBackdrop',
                description: '是否显示弹出层遮罩',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyShowSelectNow',
                description: '是否显示选择此刻',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyAllowClear',
                description: '是否可清空',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'ngModelChange',
                description: '绑定的值变更事件',
                type: 'EventEmitter<Date>',
                default: '-'
            },
            {
                name: 'thyOpenChange',
                description: '打开/关闭选择面板触发的事件',
                type: 'EventEmitter<boolean>',
                default: '-'
            }
        ]
    }
];
