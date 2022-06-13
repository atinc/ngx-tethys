module.exports = [
    {
        type: 'directive',
        name: 'thyResizable',
        properties: [
            {
                name: 'thyBounds',
                description: '调整尺寸的边界',
                type: 'string',
                default: 'window ｜ parent'
            },
            {
                name: 'thyMaxHeight',
                description: '最大高度(超过边界部分忽略)',
                type: 'number',
                default: ''
            },
            {
                name: 'thyMaxWidth',
                description: '最大宽度(超过边界部分忽略)',
                type: 'number',
                default: ''
            },
            {
                name: 'thyMinHeight',
                description: '最小高度',
                type: 'number',
                default: '40'
            },
            {
                name: 'thyMinWidth',
                description: '最小宽度',
                type: 'number',
                default: '40'
            },
            {
                name: 'thyGridColumnCount',
                description: '栅格列数(-1 为不栅格)',
                type: 'number',
                default: '-1'
            },
            {
                name: 'thyMaxColumn',
                description: '栅格最大列数',
                type: 'number',
                default: ''
            },
            {
                name: 'thyMinColumn',
                description: '栅格最小列数',
                type: 'number',
                default: ''
            },
            {
                name: 'thyLockAspectRatio',
                description: '锁定宽高比',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyPreview',
                description: '预览',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabled',
                description: '禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyResize',
                description: '调整尺寸时的事件',
                type: 'EventEmitter<ThyResizeEvent>',
                default: ''
            },
            {
                name: 'thyResizeStart',
                description: '开始调整尺寸时的事件',
                type: 'EventEmitter<ThyResizeEvent>',
                default: ''
            },
            {
                name: 'thyResizeEnd',
                description: '结束调整尺寸时的事件',
                type: 'EventEmitter<ThyResizeEvent>',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thyResizeHandle',
        properties: [
            {
                name: 'thyDirection',
                description: '调整方向',
                type: 'ThyResizeDirection',
                default: 'bottomRight'
            }
        ]
    },
    {
        type: 'component',
        name: 'thyResizeHandles',
        properties: [
            {
                name: 'thyDirections',
                description: '调整方向',
                type: 'ThyResizeDirection[]',
                default: "['bottomRight', 'topRight','bottomLeft','topLeft','bottom','right','top','left']"
            }
        ]
    }
];
