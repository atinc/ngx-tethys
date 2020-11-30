module.exports = [
    {
        type: 'component',
        name: 'Fullscreen 全屏',
        description: '将某一区域进行全屏展示',
        properties: [
            {
                name: 'thyMode',
                description: '全屏类型',
                type: "FullscreenMode = 'immersive' | 'normal'",
                default: 'immersive'
            },
            {
                name: 'thyFullscreenClasses',
                description: '打开全屏时需要添加的类名',
                type: "string(多个时用','分隔)",
                default: ''
            },
            {
                name: 'thyFullscreenChange',
                description: '全屏之后的回调',
                type: 'EventEmitter<boolean>',
                default: ''
            },
            {
                name: 'fullscreen-target',
                description: '设置需要全屏的元素（必选）',
                type: 'HTMLElement',
                default: ''
            },
            {
                name: 'fullscreen-launch',
                description: '设置触发进入全屏的按钮（必选）',
                type: 'HTMLElement',
                default: ''
            },
            {
                name: 'fullscreen-container',
                description: '设置全屏容器',
                type: 'HTMLElement',
                default: ''
            }
        ]
    }
];
