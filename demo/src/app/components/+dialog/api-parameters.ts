export const apiParameters = [
    {
        property: 'size',
        description: '弹出框的大小，ThyDialogSizes: sm, md, lg, max-lg',
        type: 'ThyDialogSizes | string',
        default: 'md'
    },
    {
        property: 'hasBackdrop',
        description: '是否有幕布',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'backdropClickClosable',
        description: '点击幕布是否自动关闭弹出框',
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
        property: 'initialState',
        description: '传入的初始化状态，弹出组件的变量会自动赋值，在 ngOnInit 生命周期钩子可以获取到，构造函数获取不到',
        type: 'any',
        default: 'null'
    },
    {
        property: 'maxHeigh',
        description: '弹出框最大高度',
        type: 'number | string',
        default: '85vh'
    }
];
