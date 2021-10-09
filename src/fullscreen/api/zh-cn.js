module.exports = [
    {
        type: 'component',
        name: 'thy-fullscreen,thyFullscreen',
        description: '将某一区域进行全屏展示，支持组件`thy-fullscreen`和`thyFullscreen`指令两种形式',
        properties: [
            {
                name: 'thyMode',
                description:
                    'immersive 模式使用了浏览器提供的全屏，整个窗体都全屏，emulated 模式为仿真的，只会在 body 区域全屏，默认 immersive',
                type: "'immersive' | 'emulated'",
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
