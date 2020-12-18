module.exports = [
    {
        type: 'CLASS',
        name: 'Config参数',
        properties: [
            {
                name: 'origin',
                description: '弹出悬浮层位置计算的 Origin Element，Connected Element',
                type: 'ElementRef | HTMLElement',
                default: ''
            },
            {
                name: 'originActiveClass',
                description: '对弹出悬浮层位置计算的 Origin Element，Connected Element 添加 class',
                type: 'string | string[]',
                default: 'thy-popover-origin-active'
            },
            {
                name: 'manualClosure',
                description: `是否只能手动关闭，唯一标识为origin`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'initialState',
                description: '传入的初始化状态，弹出组件的变量会自动赋值，在 ngOnInit 生命周期钩子可以获取到，构造函数获取不到',
                type: 'any',
                default: 'null'
            },
            {
                name: 'hasBackdrop',
                description: '是否有幕布',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'panelClass',
                description: 'overlay panel 类名',
                type: 'string | string[]',
                default: ''
            },
            {
                name: 'backdropClosable',
                description: '点击幕布或者按ESC键是否自动关闭弹出框，hasBackdrop=true时该参数起作用',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'insideClosable',
                description: '点击popover内部是否自动关闭弹出框',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'outsideClosable',
                description: '点击popover外部是否自动关闭弹出框，hasBackdrop=false时该参数起作用',
                type: 'boolean',
                default: 'false'
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
                name: 'maxHeigh',
                description: '弹出框最大高度',
                type: 'number | string',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-popover-header',
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
                name: 'thyClosed',
                description: '关闭事件',
                type: 'EventEmitter',
                default: 'null'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-popover-body',
        properties: []
    },
    {
        type: 'DIRECTIVE',
        name: 'thyPopover',
        properties: [
            {
                name: 'thyPopover',
                description: '弹出的悬浮层内容',
                type: 'ComponentType | TemplateRef',
                default: ''
            },
            {
                name: 'thyTrigger',
                description: `触发方式，hover, focus, click`,
                type: 'string',
                default: 'click'
            },
            {
                name: 'thyPlacement',
                description: `弹出位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'`,
                type: 'string',
                default: 'bottom'
            },
            {
                name: 'thyOffset',
                description: '弹出 Popover 的偏移量',
                type: 'number',
                default: '4'
            },
            {
                name: 'thyShowDelay',
                description: '打开延迟毫秒',
                type: 'number',
                default: '0'
            },
            {
                name: 'thyHideDelay',
                description: '关闭延迟毫秒',
                type: 'number',
                default: '0'
            }
        ]
    }
];
