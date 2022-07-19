module.exports = [
    {
        type: 'directive',
        name: 'thyDropContainer',
        properties: [
            {
                name: 'thyDropContainer',
                type: 'any[]',
                default: '-',
                description: '数据'
            },
            {
                name: 'thyDropContainerData',
                type: 'any[]',
                default: '-',
                description: '数据'
            },
            {
                name: 'thyDropContainerDisabled',
                type: 'boolean',
                default: 'false',
                description: '是否禁用拖拽'
            },
            {
                name: 'thyBeforeDragStart',
                type: '(e: ThyDragStartEvent<T>) => boolean',
                default: 'false',
                description: '拖拽之前的回调，函数返回 false 则阻止拖拽'
            },
            {
                name: 'thyBeforeDragOver',
                type: '(e: ThyDragOverEvent<T>) => boolean',
                default: '-',
                description: '拖拽时回调，函数返回 false 则阻止移入'
            },
            {
                name: 'thyBeforeDragDrop',
                type: '(e: ThyDragDropEvent<T>) => boolean',
                default: '-',
                description: '拖放到元素时回调，函数返回 false 则阻止放置'
            },
            {
                name: 'thyDragStarted',
                type: 'EventEmitter<ThyDragStartEvent<ThyDragDirective>>',
                default: '-',
                description: '开始拖拽时调用'
            },
            {
                name: 'thyDragEnded',
                type: 'EventEmitter<ThyDragEndEvent<ThyDragDirective>>',
                default: '-',
                description: 'dragend 触发时调用'
            },
            {
                name: 'thyDragOvered',
                type: 'EventEmitter<ThyDragOverEvent<ThyDragDirective>>',
                default: '-',
                description: 'dragover 触发时调用'
            },
            {
                name: 'thyDragDropped',
                type: 'EventEmitter<ThyDragDropEvent<ThyDragDirective>>',
                default: '-',
                description: 'drop 触发时调用'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyDrag',
        properties: [
            {
                name: 'thyDrag',
                type: 'any[]',
                default: '-',
                description: '数据'
            },
            {
                name: 'thyDragData',
                type: 'any[]',
                default: '-',
                description: '数据'
            },
            {
                name: 'thyDragDisabled',
                type: 'boolean',
                default: 'false',
                description: '是否禁用拖拽'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyDragHandle',
        description: '自定义可拖拽区域内容',
        properties: []
    },
    {
        type: 'directive',
        name: 'thyDragContent',
        description: '自定义拖拽时可经过，拖拽结束时可放置的区域内容',
        properties: []
    }
];
