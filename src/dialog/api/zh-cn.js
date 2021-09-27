module.exports = [
    {
        type: 'CLASS',
        name: 'Config参数',
        properties: [
            {
                name: 'id',
                description: '弹出框的唯一标识',
                type: 'string'
            },
            {
                name: 'size',
                description: '弹出框的大小，ThyDialogSizes: sm (400), md (660), lg (800), maxLg (980), supperLg (94vw), full (全屏)',
                type: 'ThyDialogSizes',
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
                name: 'backdropClass',
                description: '自定义幕布的样式',
                type: 'string | string[]'
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
            },
            {
                name: 'width',
                description: '自定义弹出框的宽度',
                type: 'string',
                default: '660px'
            },
            {
                name: 'height',
                description: '自定义弹出框的高度',
                type: 'string',
                default: '85vh'
            },
            {
                name: 'position',
                description: '定位模态框的弹出位置',
                type: '{ top?: string; bottom?: string; left?: string; right?: string;}'
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
                type: 'ContentChild<TemplateRef>',
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
                description: '底部是否有分割线，可全局配置默认值',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyAlign',
                description: '对齐方式，`left | center | right`，可全局配置默认值',
                type: 'string',
                default: 'left'
            },
            {
                name: '#description',
                description: '自定义弹出框底部的描述模板',
                type: 'ContentChild<TemplateRef>',
                default: ''
            }
        ]
    },
    {
        type: 'CLASS',
        name: 'ThyConfirmConfig参数',
        properties: [
            {
                name: 'title',
                description: '标题',
                type: 'string',
                default: '确认删除'
            },
            {
                name: 'content',
                description: '提示内容',
                type: 'string',
                default: ''
            },
            {
                name: 'okText',
                description: '确认按钮的文案',
                type: 'string',
                default: '确认'
            },
            {
                name: 'cancelText',
                description: '取消按钮的文案',
                type: 'string',
                default: '取消'
            },
            {
                name: 'okType',
                description: '确认按钮的类型，primary | danger',
                type: 'string',
                default: 'danger'
            },
            {
                name: 'okLoadingText',
                description: '确认按钮处于提交状态时的文案',
                type: 'string',
                default: 'okText'
            },
            {
                name: 'footerAlign',
                description: '底部对齐方式，left | center | right',
                type: 'string',
                default: 'left'
            },
            {
                name: 'onOk',
                description: '确认后的回调事件',
                type: '() => Observable<boolean> | void',
                default: ''
            }
        ]
    }
];
