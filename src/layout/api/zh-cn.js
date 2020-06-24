module.exports = [
    {
        type: 'component',
        name: 'thy-layout',
        description: '布局组件',
        properties: []
    },
    {
        type: 'component',
        name: 'thy-content',
        description: '布局内容组件',
        properties: []
    },
    {
        type: 'component',
        name: 'thy-sidebar',
        description: '布局侧边栏组件',
        properties: [
            {
                name: 'thyWidth',
                description: '宽度, 默认是 240px, 传入 lg 大小时宽度是300px',
                type: 'number | "lg"',
                default: ''
            },
            {
                name: 'thyIsolated',
                description: '是否和右侧隔离, 当为 true 是距右侧会有 margin, 同时边宽会去掉',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyHasBorderRight',
                description: '右侧是否有边框',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyIsDraggableWidth',
                description: '宽度是否可以拖拽',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-header',
        description: '布局头部组件',
        properties: [
            {
                name: 'thyTitle',
                description: '头部标题',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIcon',
                description: '图标，SVG 图标名称',
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: '头部大小，md | sm，`md`高度50px，`sm`高度38px',
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyHasBorder',
                description: '底部是否有边框',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyIconPrefix',
                description: '图标前缀，被弃用，图标使用 SVG 图标',
                type: 'string',
                default: 'wtf'
            },
            {
                name: 'headerTitle',
                description: '头部自定义标题模版，<ng-template #headerTitle></ng-template>',
                type: 'TemplateRef',
                default: 'null'
            },
            {
                name: 'headerContent',
                description: '头部自定义内容模版，<ng-template #headerContent></ng-template>',
                type: 'TemplateRef',
                default: 'null'
            },
            {
                name: 'headerOperation',
                description: '头部自定义操作模版，<ng-template #headerOperation></ng-template>',
                type: 'TemplateRef',
                default: 'null'
            }
        ]
    }
];
