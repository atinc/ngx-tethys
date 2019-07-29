export const apiPopoverConfigParameters = [
    {
        property: 'origin',
        description: '弹出悬浮层位置计算的 Origin Element，Connected Element',
        type: 'ElementRef | HTMLElement',
        default: ''
    },
    {
        property: 'placement',
        description: `弹出位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'`,
        type: 'string',
        default: 'bottom'
    },
    {
        property: 'initialState',
        description: '传入的初始化状态，弹出组件的变量会自动赋值，在 ngOnInit 生命周期钩子可以获取到，构造函数获取不到',
        type: 'any',
        default: 'null'
    },
    {
        property: 'hasBackdrop',
        description: '是否有幕布',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'backdropClosable',
        description: '点击幕布或者按ESC键是否自动关闭弹出框',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'closeOnNavigation',
        description: '切换浏览器导航是否自动关闭弹出框',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'viewContainerRef',
        description: '当前的组件的 viewContainerRef, 指定后弹出的组件的父注入器为当前组件的注入器',
        type: 'ViewContainerRef',
        default: 'null'
    },
    {
        property: 'maxHeigh',
        description: '弹出框最大高度',
        type: 'number | string',
        default: ''
    }
];
