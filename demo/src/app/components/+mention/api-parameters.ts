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
    }
];
