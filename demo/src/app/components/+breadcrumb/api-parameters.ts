export const apiBreadcrumbParameters = [
    {
        property: 'thyIcon',
        description: '面包屑的前缀展示图标，可以是 wtf wtf-folder, 如果是 wtf 图标，可以省略 wtf',
        type: 'string',
        default: ''
    },
    {
        property: 'thySeparator',
        description: '面包屑的分隔符，不传值默认为">", thySeparator可选值为"slash","backslash"',
        type: 'string',
        default: ''
    }
];
