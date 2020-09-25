module.exports = [
    {
        type: 'DIRECTIVE',
        name: 'thy-mention',
        properties: [
            {
                name: 'thyMention',
                description: `大小，xs | sm | md | lg`,
                type: 'Mention',
                default: ''
            },
            {
                name: 'thyPopoverConfig',
                description: `Popover弹出层参数配置`,
                type: 'ThyPopoverConfig',
                default: ''
            },
            {
                name: 'thySelectSuggestion',
                description: `选择后的回调函数`,
                type: 'MentionSuggestionSelectEvent',
                default: ''
            }
        ]
    },
    {
        type: 'class',
        name: 'Mention 参数',
        properties: [
            {
                name: 'trigger',
                description: 'Mention 触发字符，比如 @ #',
                type: 'string',
                default: ''
            },
            {
                name: 'data',
                description: 'Mention 选择数据源',
                type: 'Array<Item>',
                default: ''
            },
            {
                name: 'emptyText',
                description: '未匹配到数据的内容',
                type: 'string',
                default: '无匹配数据，按空格完成输入'
            },
            {
                name: 'popoverClass',
                description: '设置弹出Popover Class',
                type: 'string',
                default: ''
            },
            {
                name: 'autoClose',
                description: '设置未匹配到数据时是否自动关闭',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'displayTemplateRef',
                description: '显示选择项的模板，默认只显示 name',
                type: 'TemplateRef',
                default: ''
            },
            {
                name: 'insertTransform',
                description: '插入字符转换器，默认插入 ${trigger}${name}',
                type: '(item: Item) => string',
                default: ''
            },
            {
                name: 'search',
                description: '搜索函数，支持返回异步Observable数据',
                type: '(term: string, items?: T[]) => T[] | Observable<T[]>',
                default: ''
            }
        ]
    }
];
