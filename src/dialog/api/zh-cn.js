module.exports = [
    {
        type: 'CLASS',
        name: 'Config参数',
        properties: [
            {
                name: 'size',
                description: '弹出框的大小，ThyDialogSizes: sm, md, lg, max-lg',
                type: 'ThyDialogSizes | string',
                default: 'md'
            },
            {
                name: 'hasBackdrop',
                description: '是否有幕布',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'backdropClosable',
                description: '点击幕布或者按ESC键是否自动关闭弹出框',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'closeOnNavigation',
                description: '切换浏览器导航是否自动关闭弹出框',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'viewContainerRef',
                description: '当前的组件的 viewContainerRef, 指定后弹出的组件的父注入器为当前组件的注入器',
                type: 'ViewContainerRef',
                default: 'null'
            },
            {
                name: 'initialState',
                description: '传入的初始化状态，弹出组件的变量会自动赋值，在 ngOnInit 生命周期钩子可以获取到，构造函数获取不到',
                type: 'any',
                default: 'null'
            },
            {
                name: 'maxHeigh',
                description: '弹出框最大高度',
                type: 'number | string',
                default: '85vh'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-dialog-header',
        properties: [
            {
                name: 'thyTitle',
                description: '标题',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTitleTranslationKey',
                description: '标题的多语言 Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: '大小，只有大的详情页场景会使用 lg, 左右 padding 缩小至 20px',
                type: 'md | lg',
                default: 'md'
            },
            {
                name: '#dialogHeader',
                description: '自定义头部模版',
                type: 'TemplateRef',
                default: ''
            },
            {
                name: 'thyOnClose',
                description: '关闭事件',
                type: 'EventEmitter',
                default: 'null'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-dialog-body',
        properties: [
            {
                name: 'thyClearPadding',
                description: '清除间距',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-dialog-footer',
        properties: [
            {
                name: 'thyDivided',
                description: '顶部是否有分割线，可全局配置默认值',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyAlign',
                description: '对齐方式，`left | center | right`，可全局配置默认值',
                type: 'string',
                default: 'left'
            }
        ]
    }
];
