module.exports = [
    {
        type: 'component',
        name: 'thy-calendar',
        properties: [
            {
                name: 'thyMode',
                type: 'string',
                default: 'month | year',
                // description: '（可双向绑定）展示模式' // 暂无双向绑定功能
                description: '展示模式'
            },
            {
                name: 'thyValue',
                type: 'Date',
                default: '当前日期',
                description: '（可双向绑定）展示日期'
            },
            {
                name: 'thyDisabledDate',
                type: '(date: Date) => boolean',
                default: '-',
                description: '不可选择的日期'
            },
            // 有此属性，暂无此功能
            // {
            //     name: 'thyFullscreen',
            //     type: 'boolean',
            //     default: 'true',
            //     description: '是否全屏显示'
            // },
            // 有此方法，暂无此功能
            // {
            //     name: 'thyPanelChange',
            //     type: `EventEmitter<{ date: Date, mode: 'month' | 'year' }>'`,
            //     default: '-',
            //     description: '面板变化的回调'
            // },
            {
                name: 'thySelectChange',
                type: 'EventEmitter<Date>',
                default: '-',
                description: '日期选择变化的回调'
            },
            {
                name: 'thyDateRangeChange',
                type: 'EventEmitter<DateRangeItemInfo>',
                default: '-',
                description: '日期选择范围变化的回调'
            },
            {
                name: 'thyDateCell',
                type: 'TemplateRef<{ $implicit: Date }>',
                default: '-',
                description: '（可作为内容）自定义渲染日期单元格，模版内容会被追加到单元格'
            },
            {
                name: 'thyCalendarHeaderOperation',
                type: 'TemplateRef<{ $implicit: Date }>',
                default: '-',
                description: '（可作为内容）自定义渲染组件右上角'
            }
        ]
    }
];
