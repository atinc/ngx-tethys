export const apiBreadcrumbParameters = [
    {
        property: 'thyIcon',
        description: '面包屑的前缀展示图标，可以是iconName或wtf图标,如folder-fill，wtf-angle-down',
        type: 'string',
        default: ''
    },
    {
        property: 'thySeparator',
        description: '面包屑的分隔符，不传值默认为">", thySeparator可选值为"slash","backslash"',
        type: 'string',
        default: ''
    },
    {
        property: 'thyMaxItemCount',
        description: '最大展示面包屑的条数',
        type: 'number',
        default: '5'
    }
];

export const apiBreadcrumbItemParameters = [
    {
        property: 'contentRef',
        description: '面包屑item中的模版，使用此模版可以实现当出现折叠面包屑时，折叠下拉展示所有的面包屑',
        type: 'TemplateRef',
        default: ''
    }
];
