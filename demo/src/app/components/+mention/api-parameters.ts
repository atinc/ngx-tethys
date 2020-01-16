export const apiMentionParameters = [
    {
        property: 'thyMention',
        description: 'Mention config',
        type: 'Mention[]',
        default: '[]'
    }
];

export const apiMentionItemParameters = [
    {
        property: 'trigger',
        description: 'Mention 触发字符，比如 @ #',
        type: 'string',
        default: ''
    },
    {
        property: 'data',
        description: 'Mention 选择数据源',
        type: 'Array<Item>',
        default: ''
    },
    {
        property: 'emptyText',
        description: '未匹配到数据的内容',
        type: 'string',
        default: '无匹配数据，按空格完成输入'
    },
    {
        property: 'popoverClass',
        description: '设置弹出Popover Class',
        type: 'string',
        default: ''
    },
    {
        property: 'autoClose',
        description: '设置未匹配到数据时是否自动关闭',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'displayTemplateRef',
        description: '显示选择项的模板，默认只显示 name',
        type: 'TemplateRef<Item>',
        default: ''
    },
    {
        property: 'insertTransform',
        description: '插入字符转换器，默认插入 ${trigger}${name}',
        type: '(item: Item) => string',
        default: ''
    },
    {
        property: 'search',
        description: '搜索函数，支持返回异步Observable数据',
        type: '(term: string, items?: T[]) => T[] | Observable<T[]>',
        default: ''
    }
];
