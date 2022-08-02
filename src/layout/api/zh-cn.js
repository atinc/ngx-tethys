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
                description: '是否和右侧隔离, 当为 true 时距右侧会有 margin, 同时边框会去掉',
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
                name: 'thyTrigger',
                description: '展示收起的触发器自定义模板，默认显示展开收起的圆形图标，设置为 null 表示不展示触发元素，手动控制展开收起状态',
                type: 'null | undefined | TemplateRef<any>',
                default: 'undefined'
            },
            {
                name: 'thyDraggable',
                description: '宽度是否可以拖拽',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDragMaxWidth',
                description: '拖拽的最大宽度',
                type: 'number',
                default: 'null'
            },
            {
                name: 'thyCollapsible',
                description: '开启收起/展开功能',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyCollapsed',
                description: '是否是收起',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyCollapsedWidth',
                description: '收起后的宽度',
                type: 'number',
                default: '20'
            },
            {
                name: 'thyCollapsedChange',
                description: '收起状态改变后的事件',
                type: 'EventEmitter<boolean>',
                default: ''
            },
            {
                name: 'thyDragWidthChange',
                description: '拖拽宽度的修改事件',
                type: 'EventEmitter<number>',
                default: ''
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
                description: `头部大小，'md' | 'sm' | 'lg' | 'xlg'`,
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyHasBorder',
                description: '底部是否有边框，已弃用，请使用 thyDivided 代替',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDivided',
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
